var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var UsersSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, require: true },
  email: { type: String, unique: true, required: true },
  paymentId: { type: Schema.Types.ObjectId, ref: 'Payments' },
  groupId: { type: Schema.Types.ObjectId, ref: 'Groups' },
  activated: { type: Boolean, default: false },
  type: { type: String, enum: ['owner', 'guest', 'partner'] },
  banned: { type: Boolean, default: false },
  services: {}, // TODO , set by ID or set object with all the properties
  profile: {
    firstName: { type: String, required: true },
    lastName: String,
    country: String,
    description: String,
    socials: [{
      type: { type: String },
      username: { type: String },
      url: { type: String }
    }],
    phone: {
      area: String,
      number: String
    },
    picture: {
      small: { type: String, default: null },
      medium: { type: String, default: null },
      normal: { type: String, default: null }
    }
  }
});


// generating a hash
UsersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UsersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UsersSchema);
