var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  groupId: { type: Schema.Types.ObjectId, ref: 'Groups' },
  planType: { type: String },
  expirationDate: Date,
  paymentDate: Date,
  autoBilling: Boolean,
  cardType: String,
  validPayment: Boolean
});

module.exports = mongoose.model('Payments', PaymentSchema);
