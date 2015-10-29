var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name_first: {type: String, required: true},
  name_last: {type: String, required: true},
  email: {type: String, required: true},
  email_alt: {type: String},
  phone_office: {type: Number, required: true},
  phone_mobile: {type: Number},
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
  password: {type: String}
});

module.exports = mongoose.model('User', schema);
