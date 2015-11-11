var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var User = new mongoose.Schema({
  name: {
    first: {type: String},
    last: {type: String}
  },
  email: { type: String, unique: true, index: true, trim: true },
  email_alt: {type: String},
  phone_office: {type: Number, required: true},
  phone_mobile: {type: Number},
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
  password: { type: String }
});

User.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

User.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', schema);
