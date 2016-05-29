var config = require('../../config/config');
var _ = require('lodash');
var Passport = require('passport');
var moment = require('moment');
var jwt = require('jwt-simple');

var Auth = module.exports = function() {
  return Auth;
};

Auth.createToken = function(user) {

  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(600, 'minutes').unix()
  };

  return jwt.encode(payload, config.tokenSecret);
};

Auth.verify = function verify(req, res, next) {

  if (!req.headers.authorization)
    return res.status(401)
      .send({
        code: 202,
        success: false,
        key: true,
        message: 'not authorized'
      });

  if (!req.user)
    return res.status(403)
      .send({
        code: 101,
        success: false,
        key: true,
        message: 'not authenticated',
        description: 'header_required'
      });

  var token = req.headers.authorization;

  if (!token) {

    return res
      .status(401)
      .send({
        code: 103,
        success: false,
        key: true,
        message: req.tr('token_invalid'),
        description: req.tr('incorrect_token')
      });
  }

  try {
    var payload = jwt.decode(token, config.tokenSecret);
  } catch (e) {

    var message = e.message;

    if (message.match('expired')) {
      return res
        .status(401)
        .send({
          code: 102,
          success: false,
          key: true,
          message: 'expired',
          description: 'token expired'
        });
    }

    return res
      .status(401)
      .send({
        code: 103,
        success: false,
        key: true,
        message: req.tr('token_invalid'),
        description: req.tr('incorrect_token')
      });
  }

  if (req.user._id.toString() !== payload.sub)
    return res
      .status(401)
      .send({
        code: 105,
        success: false,
        key: true,
        message: req.tr('token_invalid'),
        description: req.tr('incorrect_token')
      });

  if (payload.exp <= moment().unix())
    return res
      .status(401)
      .send({
        code: 102,
        success: false,
        key: true,
        message: req.tr('invalid_header'),
        description: req.tr('token_expired_message')
      });


  next();
}
