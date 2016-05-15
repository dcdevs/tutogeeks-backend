var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  description: { type: String },
  cots: { type: Number },
  type: { type: String },
  duration: { type: Number },
  services: {} // TODO, define services
});

module.exports = mongoose.model('Services', ServiceSchema);
