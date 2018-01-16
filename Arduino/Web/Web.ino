#include <SPI.h>
#include <Ethernet.h>

String url = "studio404.azurewebsites.net";
String action = "/api/check/4/";

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
char server[] = "studio404.azurewebsites.net";
IPAddress ip(192, 168, 0, 177);
EthernetClient client;

unsigned long lastConnectionTime = 0;
const unsigned long postingInterval = 10L * 1000L;

int mode = 0;
// 0 - ready for request
// 1 - request processing


void setup() {
  Serial.begin(9600);
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
}

void loop() {

  if (mode == 0 && millis() - lastConnectionTime > postingInterval) {
    httpRequestCreate("0000");
    lastConnectionTime = millis();
  }

  if (mode == 1) {
    httpRequestProcess();
  }
}

void httpRequestProcess() {
  if (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  if (!client.connected()) {
    Serial.println("disconnecting");
    client.stop();
    mode = 0;
  }
}

void httpRequestCreate(String code) {
  Serial.println();
  Serial.println("connecting...");
  if (client.connect(server, 80)) {
    Serial.println("connected");
    client.println("GET " + action + code + " HTTP/1.1");
    client.println("Host: " + url);
    client.println("Connection: close");
    client.println();
    mode = 1;
  } else {
    Serial.println("connection failed");
  }
}

