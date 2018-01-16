#include <Key.h>
#include <Keypad.h>


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


void setup() {
  Serial.begin(115200);

  pinMode(LED_BUILTIN, OUTPUT);
}


void loop() {
  char key = keypad.getKey();

  if (key != NO_KEY) {
    Serial.println(key);

    digitalWrite(LED_BUILTIN, HIGH);
    delay(300);
    digitalWrite(LED_BUILTIN, LOW);
  }
}
