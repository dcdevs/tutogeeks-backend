var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: { type: String, unique: true },
  type: { type: String },
  related: [] // Id of related tags
});

module.exports = mongoose.model('Tags', TagSchema);
