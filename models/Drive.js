var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {type: String, required: true},
  size: {type: String, required: true},
  serial_number: {type: String, required: true},
  purchase_date: {type: Date, required: true},
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
  location: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  case: {type: mongoose.Schema.Types.ObjectId, ref: 'Case'},
  backing_up: {type: Boolean, default: false},
  backup_type: {type: String, required: true},
  last_backup_date: {type: Date}
});

module.exports = mongoose.model('Drive', schema);
