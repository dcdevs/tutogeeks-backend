var express = require('express'),
  app = express(),
  morgan = require('morgan'),
  i18n = require('i18n'),
  bodyParser = require('body-parser'),
  expressValidator = require('express-validator'),
  session = require('express-session'),
  mongoose = require('./common/connection');

// App router
var Router = require('./app/routes/routes');


// Set logger
app.use(morgan('dev'));

// Set request config
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Initialize utils for requests validators
app.use(expressValidator([]));


// Set langs setting
i18n.configure({
  locales: ['en', 'es'],
  directory: './common/locales',
  objectNotation: true,
  updateFiles: false,
  register: global,
  api: {
    '__': 'tr',
    '__n': 'trn'
  }
});

// Initialize langs with actual settings
app.use(i18n.init);

// Init Server
var server = app.listen(8081, function() {
  var host = server.address().address,
    port = server.address().port;
  console.log('Tutogeeks API running on http://%s:%s', host, port);
})
