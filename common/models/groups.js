var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GroupSchema = new Schema({
  ownnerId: { type: Schema.Types.ObjectId, ref: 'Users' },
  paymentId: { type: Schema.Types.ObjectId, ref: 'Payments' },
  name: { type: String, required: true },
  active: { type: Boolean, default: true },
  pictures: {
    cover: { type: String, default: null },
    avatar: { type: String, default: null }
  },
  members: [{
    username: { type: String },
    email: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' }
  }]
});

module.exports = mongoose.model('Groups', GroupSchema);
