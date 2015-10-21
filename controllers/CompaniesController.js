var Company = require('../models/Company');

module.exports = {
  read: function(req, res) {
    Company.find({
        'user': req.params.userId
      }).sort('name')
      .exec(function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
  },
  create: function(req, res) {
    Company.create(req.body, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  update: function(req, res) {
    Company.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  delete: function(req, res) {
    Company.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
};
