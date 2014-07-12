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
      callbackURL: "http://127.0.0.1:8888/auth/linkedin/callback"
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile);
      // User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  ));
  // passport.use(new LinkedinStrategy({
  //   clientID: Constants.LINKEDIN.KEY,
  //   clientSecret: Constants.,
  //   callbackURL: Constants.Facebook.CALLBACK,
  //   profileFields: ['id', 'emails', 'displayName', 'photos']
  // }, function(accessToken, refreshToken, profile, done) {
  //   User.findOne({$or: [{fbId : profile.id }, {email: profile.emails[0].value}]}, function(err, oldUser) {
  //     if (oldUser) {
  //       console.log("old user detected");
  //       return done(null, oldUser);
  //     } else {
  //       if (err) return done(err);
  //       console.log("new user found");

  //       getFriends(accessToken, function(friends) {
  //         console.log("got " + friends.length + " friends");
  //         var newUser = new User({
  //           fbId: profile.id,
  //           accessToken: accessToken,
  //           email: profile.emails[0].value,
  //           name: profile.displayName,
  //           photo: profile.photos[0].value,
  //           username: profile.emails[0].value.split('@')[0],
  //           friends: friends
  //         }).save(function(err, newUser) {
  //           if (err) return done(err);
  //           return done(null, newUser);
  //         });
  //       });
  //     }
  //   });
  // }));

}
