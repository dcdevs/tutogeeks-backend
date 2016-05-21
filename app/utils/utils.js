var bcrypt = require('bcrypt-nodejs');


var Utils = module.exports = function() {
  return Utils;
}


Utils.generateHash = function generateHash(toHash) {
  return bcrypt.hashSync(toHash, bcrypt.genSaltSync(10));
};

Utils.validateHash = function validateHash(val, toCompare) {
  return bcrypt.compareSync(toHash, toCompare);
};
