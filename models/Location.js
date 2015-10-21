var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {type: String, required: true},
  nameShort: {type: String, required: true},
  description: {type: String, required: true},
  address: {
    lineOne: {type: String, required: true},
    lineTwo: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    country: {type: String, required: true}
  },
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
});

module.exports = mongoose.model('Location', schema);
