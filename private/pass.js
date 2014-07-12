/*
  This is a wrapper for all code used for user authentication.
*/

var LinkedInStrategy = require('passport-linkedin').Strategy;
var Constants = require('./constants');


// bring in the schema for user
var User = require('mongoose').model('User');
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

  // Logic for linkedin strategy
  passport.use(new LinkedInStrategy({
      consumerKey: Constants.LINKEDIN.KEY,
      consumerSecret: Constants.LINKEDIN.SECRET,
      callbackURL: "http://127.0.0.1:8888/auth/linkedin/callback",
      profileFields: ['id', 'first-name', 'last-name', 'email-address', 'picture-url']
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile.displayName + ' logged in');
      User.findOne({linkedinId : profile.id }, function(err, oldUser) {
      if (oldUser) {
        console.log("old user detected");
        return done(null, oldUser);
      } else {
        if (err) return done(err);
        console.log("new user found");

        var newUser = new User({
          linkedinId: profile.id,
          accessToken: token,
          accessTokenSecret: tokenSecret,
          email: profile.emails[0].value,
          name: profile.displayName,
          photo: profile._json.pictureUrl,
          username: profile.emails[0].value.split('@')[0],
        }).save(function(err, newUser) {
          if (err) return done(err);
          return done(null, newUser);
        });
      }
    });
    }
  ));

}
