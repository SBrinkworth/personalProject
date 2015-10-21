var Case = require('../models/Case');

module.exports = {
  read: function(req, res) {
    Case.find()
      .populate('drive')
      .populate('location')
      .sort('name')
      .exec(function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
  },
  create: function(req, res) {
    Case.create(req.body, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  update: function(req, res) {
    Case.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  delete: function(req, res) {
    Case.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
};
