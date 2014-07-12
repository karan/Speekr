/*
  Schema for a user.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// For any user
var userSchema = new Schema({
  created_at: {
    // auto added user registration timestamp
    type: Date,
    default: Date.now
  },
  accessToken: {
    type: String
  },
  accessTokenSecret: {
    type: String
  },
  photo: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true // force email lowercase
  },
  name: {
    type: String
  },
  linkedinId: String,
  // scores and levels for each language
  en_score: {
    type: Number
  },
  en_level: {
    type: Number  // 1 = word, 2 = sentence, 3 = paragraph
  },
  es_score: {
    type: Number
  },
  es_level: {
    type: Number  // 1 = word, 2 = sentence, 3 = paragraph
  },
  zh_score: {
    type: Number
  },
  zh_level: {
    type: Number  // 1 = word, 2 = sentence, 3 = paragraph
  },
});


module.exports = mongoose.model('User', userSchema);
