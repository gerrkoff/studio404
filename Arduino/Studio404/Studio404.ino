#include <SPI.h>
#include <Ethernet.h>
#include <Key.h>
#include <Keypad.h>

// _______________________________________________________________
char server[] = "studio404.azurewebsites.net";
String action = "/api/check/240/";
const unsigned long postingInterval = 10L * 1000L;
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
byte rowPins[rows] = {9, 8, 7, 6}; //connect to the row pinouts of the keypad
byte colPins[cols] = {5, 3, 2}; //connect to the column pinouts of the keypad
Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, rows, cols );
// _______________________________________________________________


String code = "";
String responseBody = "";
int bodyDividerCount = 0;
bool readingBody = false;
unsigned long lastConnectionTime = 0;
int mode = 0;
// 0 - waiting for code
// 1 - request creating
// 2 - request processing


void setup() {
  Serial.begin(115200);
  while (!Serial) {
    ;
  }
  Serial.println("START");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    Ethernet.begin(mac, ip);
  }
  Serial.println("ETHERNET INITIALIZING");
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.println("READY");
}


void loop() {
  if (mode == 0) {
    keyProcess();
  }
  if (mode == 1) {
    httpRequestCreate();
  }
  if (mode == 2) {
    httpRequestProcess();
  }
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
    mode = 0;
    code = "";
  }
}


void processResponseBody() {
  if (responseBody.indexOf("false") > 0) {
    Serial.println("result: false");
  }
  if (responseBody.indexOf("true") > 0) {
    Serial.println("result: true");
  }
  if (responseBody.indexOf("true") == 0 && responseBody.indexOf("false") == 0) {
    Serial.println("result: unknown");
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
    Serial.println("connection failed");
  }
}


void startResponseAnalyze() {
  bodyDividerCount = 0;
  readingBody = false;
  responseBody = "";
  Serial.println("________response_______");
}

