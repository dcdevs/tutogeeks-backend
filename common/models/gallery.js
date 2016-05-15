var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GallerySchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Posts' },
  pictures: [{
    url: { type: String },
    reference: { type: String },
    datetime: Date
  }]
});

module.exports = mongoose.model('Gallery', GallerySchema);
