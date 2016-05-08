# Tutogeeks - backend
### REST API for Tutogeeks blog
___

### What do you need to execute this app on your computer?

* [node.js] - evented I/O for the backend
* [Npm] - npm is the package manager for  node.js

### Installation

first clone this repository
```sh
$ git clone https://github.com/dcdevs/tutogeeks-backend.git
```
``` sh
 cd tutogeeks-backend
```

### How to run it

First you need to install all required node modules, so execute this

```sh
$ npm install
```
Then, you need to run our app, so with this command you can run a server witch will be open the app automatically:

```sh
$  npm start
```

### Directory Structure
```
tutogeeks-backend
│   README.md
│   app.js  // server file
│   package.json
└── common
│   ├───locales
│   │   │ es.json // Spanish translations
│   │   │ en.json // English translations
│   ├───models
│   │   │//all db models
│   │
│   │  index.js / DB connection
└── config
│   │  index.js // config file with ENV variables
└── app
│   ├─── controllers
│   ├─── middlewares
│   ├─── routes
│   ├─── utils
└───│
```
   [node.js]: <http://nodejs.org>
   [Npm]: <https://www.npmjs.com/>
