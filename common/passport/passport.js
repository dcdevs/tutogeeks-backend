var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');
var _ = require('lodash');


module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, username, password, done) {

    process.nextTick(function() {

      var user = _.clone(req.tryTologin);

      if (!user.validPassword(password))
        return done(null, false, 'invalid password');


      user = user.toObject();
      delete user.password;

      req.tryTologin = undefined;

      return done(null, user);

    });

  }))

};
