var Drive = require('../models/Drive');

module.exports = {
  read: function(req, res) {
    Drive.find({company: req.params.id})
      .populate('case')
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
    Drive.create(req.body, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  update: function(req, res) {
    Drive.findByIdAndUpdate(req.params.id, req.body, {
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
    Drive.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
};
