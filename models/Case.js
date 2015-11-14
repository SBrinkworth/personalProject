var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {type: String, required: true},
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
  location: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  drive: {type: mongoose.Schema.Types.ObjectId, ref: "Drive"}
});

module.exports = mongoose.model('Case', schema);
