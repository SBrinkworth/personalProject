var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  email_alt: {type: String},
  phone: {type: Number},
  address: {
    lineOne: {type: String},
    lineTwo: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
    country: {type: String}
  }
});

module.exports = mongoose.model('Company', schema);
