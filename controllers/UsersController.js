var User = require('../models/User');

module.exports = {
  register: function(req, res) {
    User.create(req.body, function(err, user) {
      console.log(err);
      if(err) return res.send(err);
      user.password = null;
      return res.send(user);
    });
  },

  me: function(req, res) {
    if (!req.user) return res.send("current user not defined");
    req.user.password = null;
    return res.json(req.user);
  },
  update: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
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
