# Studio 404
[![GitHub last commit](https://img.shields.io/github/last-commit/gerrkoff/studio404.svg)](https://github.com/gerrkoff/studio404/)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/gerrkoff/studio404.svg)](https://github.com/gerrkoff/studio404/)
[![GitHub top language](https://img.shields.io/github/languages/top/gerrkoff/studio404.svg)](https://github.com/gerrkoff/studio404/)
[![GitHub language count](https://img.shields.io/github/languages/count/gerrkoff/studio404.svg)](https://github.com/gerrkoff/studio404/)

## Workflow
- Book the time
- Pay for it
- Receive message with the code
- Now you have access to the rented space via the code during booked time

## Under the hood
Two Single Page Applications consuming REST service:
- Client – for Users to book time and pay for it
- Admin – for Admins to handle settings and check bookings

#### Technologies
- Client – ReactJS, Redux, MaterialUI, Bootstrap
- Admin – Angular 2+, Ant Design
- Backend – ASP.NET Core, Entity Framework Core, MS SQL, PostgreSQL

#### Integrations
- Yandex.Money – to process payments
- Sms.Ru & Twillio – to send user an SMS with the code
- Arduino – to check if the entered code is valid and open door to the rented space

## Demo
#### Client
https://studio404.grkf.ru/
#### Admin
https://studio404admin.grkf.ru/
```
Username: sandbox
Password: S@ndb0x
```
