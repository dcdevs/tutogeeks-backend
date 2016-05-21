var express = require('express');
var router = express.Router();
var _ = require('lodash');

var User = require('../../common/models/users');

module.exports = router;


router.post('/signUp', function(req, res) {

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

    if (_.isNull(user)) {

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


      return saveUser.save(function(err, created) {
        if (err)
          return res.status(202)
            .send({ success: false, data: err });

        return res.status(200).send({ success: true, data: created });
      })

    }

    if (user.username === params.username)
      return res.status(202)
        .send({ success: false, key: true, message: 'username already exists' });

    if (user.email === params.email)
      return res.status(202)
        .send({ success: false, key: true, message: 'email already exists' });

  });

})
