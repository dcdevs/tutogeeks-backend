var sanitizer = require('sanitizer');
var _ = require('lodash');


module.exports = function sanitazeRequest() {
  return sanizaseRequests;
};


function sanitizeString(val) {
  var sanitized = sanitizer.sanitize(val);
  return sanitized;
}

function sanitizeObject(val) {
  var form;

  try {
    var separate = JSON.stringify(val);
    var clean = sanitizer.sanitize(separate);
    form = JSON.parse(clean);
  } catch (e) {
    form = val;
  }

  return form;
}


function sanizaseRequests(req, res, next) {

  var requests = [req.body, req.query, req.params];

  _.forEach(requests, function(item, index, fulled) {

    if (_.size(item)) {

      _.forEach(item, function(val, key) {

        if (val) {

          if (_.isString(val))
            fulled[index][key] = sanitizeString(val);

          if (_.isArray(val) || _.isObject(val))
            fulled[index][key] = sanitizeObject(val);
        }

      });

    }
  });

  next();
}
