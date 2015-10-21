var User = require('../models/User');

module.exports = {
  read: function(req, res) {
    User.findById(req.params.id, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  create: function(req, res) {
    User.create(req.body, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  update: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
};
