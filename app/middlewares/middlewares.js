var config = require('../../config/config');
var _ = require('lodash');
var Passport = require('passport');
var moment = require('moment');
var jwt = require('jwt-simple');

var Auth = module.exports = function(_app) {
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

  var token = req.headers.authorization.split(" ")[1];

  if (token) {

    try {
      var payload = jwt.decode(token, config.secretToken);
    } catch (e) {
      return res
        .status(401)
        .send({
          code: 101,
          success: false,
          key: true,
          message: req.trans('token_invalid'),
          description: req.trans('incorrect_token')
        });
    }

  } else {

    return res
      .status(401)
      .send({
        code: 102,
        success: false,
        key: true,
        message: req.trans('token_invalid'),
        description: req.trans('incorrect_token')
      });
  }

  if (payload.exp <= moment().unix()) {
    return res
      .status(401)
      .send({
        code: 102,
        success: false,
        key: true,
        message: req.trans('invalid_header'),
        description: req.trans('token_expired_message')
      });
  }
  console.log(req.user);
}
