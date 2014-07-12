// calculate a score based on actual text and text that user spoke

var Score = function(actualText, userText) {
  var l = new Levenshtein(actualText, userText);
  var distance = l.distance;
  return distance + (actualText.length - userText.length) ^ 2;
}
