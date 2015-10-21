var _Location = require('../models/Location');

module.exports = {
  read: function(req, res) {
    _Location.find().sort('name')
      .exec(function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
  },
  create: function(req, res) {
    _Location.create(req.body, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  update: function(req, res) {
    _Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  delete: function(req, res) {
    _Location.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
};
