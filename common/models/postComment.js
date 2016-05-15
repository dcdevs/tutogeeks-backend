var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostCommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Posts' },
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  comment: { type: String },
  datetime: Date,
  isReply: { type: Boolean, default: null },
  replies: [{
    comment: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    datetime: Date
  }]
});

module.exports = mongoose.model('PostComments', PostCommentSchema);
