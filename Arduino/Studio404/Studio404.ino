#include <SPI.h>
#include <Ethernet.h>
#include <Key.h>
#include <Keypad.h>

// _______________________________________________________________
char server[] = "studio404.devstage.ru";
String action = "/api/check/240/";
String masterCode = "1111";
const unsigned long postingInterval = 10L * 1000L;
// _______________________________________________________________

// _______________________________________________________________
const byte pinLed = A2;
const byte pinGreen = A1;
const byte pinRed = A0;
const byte pinOpen = A3;
const int durationShort = 500;
const int durationLong = 1000;
const int durationOpen = 5000;
const int pause = 500;
const int connectionAttemptLimit = 3;
// _______________________________________________________________

// _______________________________________________________________
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
String url((char*)server);
IPAddress ip(192, 168, 0, 177);
EthernetClient client;
// _______________________________________________________________

// _______________________________________________________________
const byte rows = 4; //four rows
const byte cols = 3; //three columns
char keys[rows][cols] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'},
  {'*', '0', '#'}
};
// 2 3 5 6 7 8 9
// DEV KEYPAD
// byte rowPins[rows] = {9, 8, 7, 6};
// byte colPins[cols] = {5, 3, 2};
// PROD KEYPAD
byte rowPins[rows] = {9, 8, 7, 6};
byte colPins[cols] = {2, 3, 5};
Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, rows, cols );
// _______________________________________________________________

String code = "";
String responseBody = "";
int bodyDividerCount = 0;
bool readingBody = false;
unsigned long lastConnectionTime = 0;
int connectionAttemptCount = 0;
int mode = -1;
// -1 - very first time
//  0 - waiting for code
//  1 - request creating
//  2 - request processing


void setup() {
  Serial.begin(115200);
  while (!Serial) {
    ;
  }
  Serial.println("START");
  Serial.println("MASTER CODE: " + masterCode);
  Serial.println("SERVER: " + url);
  Serial.println("ACTION: " + action);
  Serial.print("KEY WAITING TIME: ");
  Serial.println(postingInterval);
  // initialize digital pin as an output.
  pinMode(pinGreen, OUTPUT);
  pinMode(pinRed, OUTPUT);
  pinMode(pinLed, OUTPUT);
  pinMode(pinOpen, OUTPUT);
  Serial.println("ETHERNET INITIALIZING...");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("... failed to configure Ethernet using DHCP");
    // Ethernet.begin(mac, ip);
    pinBlink(pinRed, 5, false);
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.println("READY");
}


void loop() {
  if (mode == -1) {
    resetAll();
  }
  if (mode == 0) {
    keyProcess();
  }
  if (mode == 1) {
    if (code == masterCode) {
      masterCodeProcess();
    }
    else {
      httpRequestCreate();
    }
  }
  if (mode == 2) {
    httpRequestProcess();
  }
}


void resultSuccess() {
  Serial.println("===SUCCESS===");
  digitalWrite(pinGreen, HIGH);
  digitalWrite(pinOpen, HIGH);
  delay(durationOpen);
  digitalWrite(pinGreen, LOW);
  digitalWrite(pinOpen, LOW);
}


void resultFail() {
  Serial.println("===FAIL===");
  pinBlink(pinRed, 1, false);
}


void resultUnknown() {
  Serial.println("===UNKNOWN===");
  pinBlink(pinRed, 3, true);
}


void masterCodeProcess() {
  resultSuccess();
  resetAll();
}


void resetAll() {
  mode = 0;
  code = "";
  connectionAttemptCount = 0;
  Serial.print("enter code: ");
  digitalWrite(pinLed, HIGH);
}


void keyProcess() {
  char key = keypad.getKey();
  if (key != NO_KEY) {
    if (key == '*') {
      code = "";
      Serial.println();
    }
    else if (key == '#') {
      Serial.println();
      Serial.println("code: " + code);
      mode = 1;
      digitalWrite(pinLed, LOW);
    }
    else {
      if (millis() - lastConnectionTime > postingInterval) {
        code = "";
        Serial.println();
      }
      code = code + key;
      lastConnectionTime = millis();
      Serial.print(key);
    }
  }
}


void httpRequestProcess() {
  if (client.available()) {
    char c = client.read();
    Serial.write(c);
    if (readingBody) {
      responseBody = responseBody + c;
    }
    else {
      checkResponseBodyDivider(c);
    }
  }
  if (!client.connected()) {
    Serial.println("_______________________");
    Serial.println("_____response body_____");
    Serial.println(responseBody);
    Serial.println("_______________________");
    processResponseBody();
    Serial.println("disconnected");
    client.stop();
    resetAll();
  }
}


void processResponseBody() {
  if (responseBody.indexOf("false") > -1) {
    Serial.println("result: false");
    resultFail();
  }
  if (responseBody.indexOf("true") > -1) {
    Serial.println("result: true");
    resultSuccess();
  }
  if (responseBody.indexOf("true") == -1 && responseBody.indexOf("false") == -1) {
    Serial.println("result: unknown");
    resultUnknown();
  }
}


void checkResponseBodyDivider(char c) {
  if (c == '\n' && bodyDividerCount == 0) {
    bodyDividerCount = bodyDividerCount + 1;
  }
  else if (bodyDividerCount == 1) {
    bodyDividerCount = bodyDividerCount + 1;
  }
  else if (c == '\n' && bodyDividerCount == 2) {
    readingBody = true;
  }
  else {
    bodyDividerCount = 0;
  }
}


void httpRequestCreate() {
  Serial.println("connecting...");
  if (client.connect(server, 80)) {
    Serial.println("connected");
    client.println("GET " + action + code + " HTTP/1.1");
    client.println("Host: " + url);
    client.println("Connection: close");
    client.println();
    mode = 2;
    startResponseAnalyze();
  } else {
    connectionAttemptCount = connectionAttemptCount + 1;
    Serial.print("connection failed, attempt #");
    Serial.println(connectionAttemptCount);
    if (connectionAttemptCount == connectionAttemptLimit) {
      Serial.println("exceeded connection attempt limit");
      resultUnknown();
      resetAll();
    }
  }
}


void startResponseAnalyze() {
  bodyDividerCount = 0;
  readingBody = false;
  responseBody = "";
  Serial.println("________response_______");
}


void pinBlink(byte pin, byte count, bool quick) {
  for (int i = 0; i < count; i++) {
    digitalWrite(pin, HIGH);
    if (quick) {
      delay(durationShort);
    }
    else {
      delay(durationLong);
    }
    digitalWrite(pin, LOW);
    delay(pause);
  }
}
