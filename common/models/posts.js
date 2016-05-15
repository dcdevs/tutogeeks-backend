var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String },
  subTitle: { type: String },
  description: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  ownnerId: { type: Schema.Types.ObjectId, ref: 'Users' },
  authors: [{
    username: String,
    userId: { type: Schema.Types.ObjectId, ref: 'Users' }
  }],
  tags: [{ name: String }],
  related: [{ post: { type: Schema.Types.ObjectId, ref: 'Posts' } }],
  content: {
    text: String,
    type: { type: String, enum: ['text', 'markdown', 'html'] },
    gallery: { type: Schema.Types.ObjectId, ref: 'Galleries' },
    pictures: {
      coverImage: { type: String, default: null },
      coverColor: { type: String, default: '#FFF' }
    }
  }
});

module.exports = mongoose.model('Posts', PostSchema);
