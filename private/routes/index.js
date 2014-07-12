var User = require('./../models/user');
var Thing = require('./../models/thing');

exports.index = function (req, res){
  res.render('index');
};

exports.authError = function(req, res) {
  res.render('index');
};

exports.authSuccess = function(req, res) {
  res.render('index', {user: req.user});
};

// Main functions

// get details for logged in user
exports.getUser = function(req, res) {
  res.send(200, req.user);
}

// return next thing for the passed language
exports.nextThing = function(req, res) {
  var lang = req.query.lang;
  Thing.find({'lang': lang, 'thingType': req.user.levels[lang].level}, function(err, docs) {
    res.send(200, docs[Math.floor(Math.random()*docs.length)]);
  });
}
