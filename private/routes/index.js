var User = require('./../models/user');
var Thing = require('./../models/thing');

exports.index = function (req, res){
  // require('./../../save_gen');
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

// submits the score for a thing
exports.submitScore = function(req, res) {
  var lang = req.body.lang;
  var score = +req.body.score;

  User.findById(req.user._id, function(err, user) {
    var newScore = user.levels[lang].scores + score;
    if (newScore >= 200) {
      newScore = 199;
    }
    req.user.levels[lang].scores = newScore;
    req.user.levels[lang].level = Math.floor(newScore/100) + 1;

    User.update({_id: req.user._id}, {$set: {levels: req.user.levels}}, 
      function(err, newUser) {
        console.log(req.user);
        res.send(200, req.user)
      });
  });

}

// get all users for the leaderboard
exports.leaderboard = function(req, res) {
  User.find({}, function(err, users) {
    res.send(200, users);
  });
}
