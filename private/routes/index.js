var User = require('./../models/user');
var Thing = require('./../models/thing');

exports.index = function (req, res){
  if (req.isAuthenticated()) {
    return res.render('index', {user: req.user});
  } else {
    return res.render('index');
  }
};

exports.authError = function(req, res) {
  res.redirect('/');
};

exports.authSuccess = function(req, res) {
  res.redirect('/');
};

// Main functions

// get details for logged in user
exports.getUser = function(req, res) {
  if (req.isAuthenticated()) {
    return res.send(200, req.user);
  } else {
    return res.send(401, {});
  }
}

// return next thing for the passed language
exports.nextThing = function(req, res) {
  var lang = req.query.lang;
  Thing.find({'lang': lang, 'thingType': req.user.levels[lang].level}, function(err, docs) {
    if (err) return res.send(500);
    res.send(200, docs[Math.floor(Math.random()*docs.length)]);
  });
}
