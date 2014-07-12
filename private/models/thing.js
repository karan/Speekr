var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var thingSchema = new Schema({
  created_at: {
    // auto added user registration timestamp
    type: Date,
    default: Date.now
  },
  thingType: {
    type: String   // one of {word, sentence, paragraph}
  },
  lang: {
    type: String   // one of {en, es, zh}
  },
  thing: {
    type: String
  }
});


module.exports = mongoose.model('Thing', thingSchema);
