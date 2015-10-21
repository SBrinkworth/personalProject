var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {type: String, required: true},
  e_mail: {type: String, required: true},
  e_mail_alt: {type: String},
  phone: {type: Number, required: true},
  address: {
    lineOne: {type: String, required: true},
    lineTwo: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    country: {type: String, required: true}
  }
});

module.exports = mongoose.model('Company', schema);
