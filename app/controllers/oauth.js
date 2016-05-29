var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Utils = require('../utils/utils');
var middleware = require('../middlewares/middlewares');
var moment = require('moment');

var User = require('../../common/models/users');
var Passport = require('passport');

module.exports = router;


router.post('/signUp', function signUp(req, res) {

  req.checkBody('username', { code: 000, message: req.tr('users.required.username') }).notEmpty();
  req.checkBody('password', { code: 000, message: req.tr('users.required.password') }).notEmpty();
  req.checkBody('passwordConfirm', { code: 000, message: req.tr('users.required.password_confirm') }).notEmpty();
  req.checkBody('firstName', { code: 000, message: req.tr('users.required.firstName') }).notEmpty();
  req.checkBody('lastName', { code: 000, message: req.tr('users.required.lastName') }).notEmpty();
  req.checkBody('email', { code: 000, message: req.tr('users.required.email') }).isEmail();

  var errs = req.validationErrors();

  if (errs)
    return res
      .status(400)
      .send({
        code: 123,
        success: false,
        key: true,
        message: 'bad request',
        data: errs
      });

  var params = req.body;

  User.findOne({ $or: [{ email: params.email }, { username: params.username }] }, function(err, user) {

    if (err)
      return res.status(202)
        .send({ success: false, data: err });

    if (!_.isNull(user)) {

      if (user.username === params.username)
        return res.status(202)
          .send({ success: false, key: true, message: 'username already exists' });

      if (user.email === params.email)
        return res.status(202)
          .send({ success: false, key: true, message: 'email already exists' });

    }

    if (params.password !== params.passwordConfirm)
      return res.status(202)
        .send({ success: false, key: true, message: 'password did not match' });

    var saveUser = new User({
      username: params.username,
      password: Utils.generateHash(params.password),
      email: params.email,
      profile: {
        firstName: params.firstName,
        lastName: params.lastName
      }
    });

    var tokenExpire = moment().add(15, "days").utc().format("X");
    var confirmToken = middleware.confirmToken(req.body.email);

    saveUser.tokens = {
      confirmation: confirmToken,
      expires: tokenExpire
    };

    return saveUser.save(function(err, created) {
      if (err)
        return res.status(202)
          .send({ success: false, data: err });


      //HERE MAIL HANDLER LOGIC

      return res.status(200).send({ success: true });
    });
  });
});


router.post('/signIn', function signIn(req, res) {

  req.checkBody('username', { code: 111, message: 'username required' }).notEmpty();
  req.checkBody('password', { code: 222, message: 'password required' }).notEmpty();

  var errors = req.validationErrors();

  if (errors)
    return res.status(202)
      .send({
        success: false,
        key: true,
        data: errors,
        message: 'invalid params'
      });

  var params = req.body;
  User.findOne({ $or: [{ username: params.username }, { email: params.username }] }, function(err, user) {

    if (err)
      return res.status(202)
        .send({ success: false, data: err });

    if (_.isNull(user))
      return res.status(202)
        .send({ success: false, key: true, message: 'this user did not exists' });


    if (!user.activated)
      return res.send(202)
        .send({ success: false, key: true, message: 'this user is not activated' });


    //pass db info to passport
    req.tryTologin = user;

    //validate password and create session
    Passport.authenticate('local', function(err, logged, info) {

      if (!logged)
        return res.status(202)
          .send({ success: false, key: true, message: info });

      //log user
      req.logIn(logged, function(err) {

        if (err)
          return res.status(202)
            .send({ success: false, key: true, message: err });

        var userToken = middleware.createToken(user);
        user.tokens = {
          token: userToken
        };

        user.save();

        return res.send({ success: true, token: userToken });

      });

    })(req, res);

  });
});


router.post('/confirm/:confirmToken', function confirmToken(req, res) {

  req.checkParams('confirmToken', { code: 111, message: 'confirmToken requiered' }).notEmpty();

  var errors = req.validationErrors();

  if (errors)
    return res.status(202)
      .send({
        success: false,
        key: true,
        data: errors,
        message: 'invalid params'
      });

  User.findOne({ 'tokens.confirmation': req.params.confirmToken, activated: false }, function(err, user) {

    if (err)
      return res.status(202)
        .send({ success: false, data: err });

    if (_.isNull(user) || _.isUndefined(user))
      return res.status(202)
        .send({ success: false, key: true, message: 'invalid token' });


    var expirationConfirm = moment().utc().format('X');

    if (expirationConfirm > user.tokens.expires)
      return res.status(202)
        .send({ success: false, key: true, message: 'token expired' });

    User.update({ email: user.email }, { activated: true, $unset: { tokens: 1 } }, function(err, data) {

      if (err)
        return res.status(202)
          .send({ success: false, key: true, data: err });

      return res.status(200)
        .send({ success: true, data: 'user activated' });

    });
  });
});
