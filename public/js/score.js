// calculate a score based on actual text and text that user spoke

var Score = function(actualText, userText, thingType) {
  var l = new Levenshtein(actualText, userText);
  var distance = l.distance;
  if (distance == 0) {
    return Math.pow(actualText.length, 2);
  }

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
  if (distance >= actualThingCount) return 0;

  return distance + Math.pow(actualThingCount - userThingCount, 2);
}
