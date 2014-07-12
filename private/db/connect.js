/**
 * Helpful database connection methods
 */

var Constants = require('../constants');

var settings = {
  url: Constants.MONGOLAB_URI
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
    console.log('connected to db ' + uri);
  });
};
