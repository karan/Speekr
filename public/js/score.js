// calculate a score based on actual text and text that user spoke

var Score = function(actualText, userText, thingType) {
  var l = new Levenshtein(actualText.toLowerCase(), userText.toLowerCase());
  var distance = l.distance;

  var actualThingCount = 0;
  var userThingCount = 0;

  switch(thingType) {
    case "1": 
      actualThingCount = actualText.length;
      userThingCount = userText.length;
      break;
    case "2":
      actualThingCount = actualText.split(' ').length;
      userThingCount = userText.split(' ').length;
      break;
    case "3":
      actualThingCount = actualText.split('.').length;
      userThingCount = userText.split('.').length;
      break;
  }

  var score = 10 - (distance / actualThingCount * 10);

  return score < 0 ? 0 : score;
}
