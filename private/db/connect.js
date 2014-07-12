/**
 * Helpful database connection methods
 */

var settings = {
  url: 'mongodb://heroku_app27330918:ds2ac8h1hjnmheeao6pjsaqsu3@ds037827.mongolab.com:37827/heroku_app27330918'
};

/**
 * Connects to MongoDB
 */
exports.connect = function() {
  var uri = process.env.MONGOLAB_URI || settings.url;

  // Connect to db
  var mongoose = require('mongoose');
  mongoose.connect(uri);

  var db = mongoose.connection;
  db.on('error', function(err) {
    console.log('connection error');
  });
  db.once('open', function() {
    console.log('connected to db');
  });
};
