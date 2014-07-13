/*
  This is a wrapper for all code used for user authentication.
*/

var FacebookStrategy = require('passport-facebook').Strategy;
var Constants = require('./constants');


// bring in the schema for user
var User = require('mongoose').model('User');
var Thing = require('mongoose').model('Thing');
var request = require('request');

module.exports = function (passport) {

  /*
    user ID is serialized to the session. When subsequent requests are 
    received, this ID is used to find the user, which will be restored 
    to req.user.
  */
  passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id)
    done(null, user._id);
  });

  /*
    intended to return the user profile based on the id that was serialized 
    to the session.
  */
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
      // console.log(user)
      if(!err) done(null, user);
      else done(err, null)
    })
  });

  // Logic for facebook strategy
  passport.use(new FacebookStrategy({
    clientID: Constants.Facebook.APPID,
    clientSecret: Constants.Facebook.SECRET,
    callbackURL: Constants.Facebook.CALLBACK
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    console.log('facebook authentication for ' + profile.displayName)
    User.findOne({$or: [{fbId : profile.id }, {email: profile.emails[0].value}]}, function(err, oldUser) {
      if (oldUser) {
        return done(null, oldUser);
      } else {
        if (err) return done(err);

        new User({
          linkedinId: profile.id,
          accessToken: token,
          accessTokenSecret: tokenSecret,
          email: profile.emails[0].value,
          name: profile.displayName,
          photo: profile._json.pictureUrl,
          username: profile.emails[0].value.split('@')[0],
          levels: {
            en: { scores: 0, level: 1 },
            es: { scores: 0, level: 1 },
            zh: { scores: 0, level: 1 },
            fr: { scores: 0, level: 1 }
          }
        }).save(function(err, newUser) {
          if (err) return done(err);
          return done(null, newUser);
        });
      }
    });
  }));

}
