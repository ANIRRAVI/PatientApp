# node-patient-api [![NPM version](https://badge.fury.io/js/node-patient-api.svg)](https://npmjs.org/package/node-patient-api) [![Build Status](https://travis-ci.org/anirravi/node-patient-api.svg?branch=master)](https://travis-ci.org/anirravi/node-patient-api)

> Patients Outstanding Management API

## Installation

```sh
$ npm install --save node-patient-api
```

## Usage

```js
var nodePatientApi = require('node-patient-api');
nodePatientApi();
```

#### Installation
  ##### Installing Node Packages
  1) From command prompt, run the `npm install` command
  ##### Build
  2) From command prompt, run the `npm run build` command
  ##### Starting MongoDB database
  3)From command prompt, run the `mongod.exe --dbpath {folder path}` command with the folder path you wish to keep the mongodb data
  `C:\Program Files\MongoDB\Server\3.6\bin>mongo.exe --dbpath "C:\Users\<username>\Mongo-Data"`
  ##### Starting the app.
  4) From Command prompt, run `npm run app`. It will give the port in which app started. you can browse to that port by, localhost:{port_number}
  `C:\Users\blokesh\Web_dev\NODE\Node_Todo_API>npm run app`
  ##### Running the Tests
  You can run the test cases of the app in command prompt, using `npm run test`.

  ```npm test

Started on port 3000
  POST /api/patients
(node:11792) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
    √ should create a new Patient (118ms)
    √ should not create patient with invalid body data

  GET /api/patients
    √ should retrieve existing Patients

  GET /api/patients/:id
    √ should return 404 if patient not found
    √ should return 404 for non-object ids
  .....
  ```

  ##### Running the coverage.
  ```npm run coverage

-------------------------|----------|----------|----------|----------|-------------------|
File                     |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------------------|----------|----------|----------|----------|-------------------|
All files                |    80.19 |       50 |       64 |    79.21 |                   |
 app                     |      100 |      100 |      100 |      100 |                   |
  app.js                 |      100 |      100 |      100 |      100 |                   |
 app/controllers         |      100 |     87.5 |      100 |      100 |                   |
  route.js               |      100 |     87.5 |      100 |      100 |                57 |
 app/controllers/Patient |    51.16 |       25 |    43.75 |    51.16 |                   |
  patient-controller.js  |    51.16 |       25 |    43.75 |    51.16 |... 05,106,111,113 |
 app/db                  |      100 |      100 |      100 |      100 |                   |
  mongoose.js            |      100 |      100 |      100 |      100 |                   |
 app/models              |      100 |      100 |      100 |      100 |                   |
  patient.js             |      100 |      100 |      100 |      100 |                   |
 app/utils               |      100 |      100 |      100 |      100 |                   |
  config.js              |      100 |      100 |      100 |      100 |                   |
-------------------------|----------|----------|----------|----------|-------------------|
```

  ##### Viewing the coverage results.
  you can also find the results in browsing the file `coverage\lcov-report\index.html` in project directory.  

## License

ISC © [Raviteja](https://www.facebook.com/raviteja.vutkuru)
