var i18n = require('i18n');
var _ = require('lodash');

exports.parseError = function(err, req, res, next) {

  var lang = req.headers['accept-language'];

  if (_.isUndefined(lang))
    lang = 'es';

  // set lang
  i18n.setLocale(lang);

  if (err.status === 400 && err.name === 'SyntaxError' && err.body) {
    return res
      .status(400)
      .send({
        code: 206,
        message: i18n.__('bad_request'),
        description: i18n.__('json_invalid')
      });
  } else if (err.status === 404) {
    return res
      .status(404)
      .send({
        code: 503,
        message: i18n.__('not_found'),
        description: i18n.__('not_found_message')
      });
  } else if (err) {
    return res
      .status(400)
      .send({
        code: 501,
        message: i18n.__('internal_server_error'),
        description: i18n.__('mongo_server_error'),
        error: err.message
      });
  }
  next();
}
