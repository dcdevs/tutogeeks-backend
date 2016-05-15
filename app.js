var express = require('express'),
  app = express(),
  morgan = require('morgan'),
  i18n = require('i18n'),
  bodyParser = require('body-parser'),
  expressValidator = require('express-validator'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  mongoose = require('./common/connection'),
  passport = require('passport'),
  config = require('./config/config');


// Set logger
app.use(morgan('dev'));

// Set request config
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


// set express session
app.use(session({
  secret: config.tokenSecret,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


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

require('./common/passport/passport')(passport);
// App router
var Router = require('./app/routes/routes')(app, passport);


// Init Server
var server = app.listen(config.port || 8081, function() {
  var host = server.address().address,
    port = server.address().port;


  console.log('Tutogeeks API running on http://%s:%s', host, port);
})
