// calculate a score based on actual text and text that user spoke

// var zh_score = function (actualText, userText) {
//   var i;
//   var actualCount = {};
//   var userCount = {};
//   for (i = 0; i < actualText.length; ++i) {
//     var c = actualText.charAt(i);
//     if (typeof actualCount[c] === 'undefined') {
//       actualCount[c] = 1;
//     } else {
//       ++actualCount[c];
//     }
//   }
//   for (i = 0; i < userText.length; ++i) {
//     var c = userText.charAt(i);
//     if (typeof userText[c] === 'undefined') {
//       userCount[c] = 1;
//     } else {
//       ++userCount[c];
//     }
//   }

//   var maxWords = Math.max(userText.length, actualText.length);
//   var totalWords = userText.length + actualText.length;
//   // Go through both to find the word count diff
//   var missedWords = 0;
//   var runningCount = 0;
//   for (i in actualCount) {
//     var aCount = actualCount[i];
//     var uCount = userCount[i];
//     if (!uCount) {
//       uCount = 0;
//     }
//     missedWords += Math.abs(aCount - uCount);
//     runningCount += aCount + uCount;
//   }

//   var badWords = missedWords + (totalWords - runningCount)/2;
//   var goodPercent = 1 - (badWords/totalWords);

//   return goodPercent * 10;
// };


var Score = function(actualText, userText, thingType, lang) {
  var l = new Levenshtein(actualText.toLowerCase(), userText.toLowerCase());
  var distance = l.distance;

  var actualThingCount = 0;
  var userThingCount = 0;

  // switch(thingType) {
  //   case "1": 
  //     actualThingCount = actualText.length;
  //     userThingCount = userText.length;
  //     break;
  //   case "2":
  //     actualThingCount = actualText.split(' ').length;
  //     userThingCount = userText.split(' ').length;
  //     break;
  //   case "3":
  //     actualThingCount = actualText.split('.').length;
  //     userThingCount = userText.split('.').length;
  //     break;
  // }

  // if (lang === 'zh') {
    actualThingCount = actualText.length;
    userThingCount = userText.length;
  // }

  // console.log(distance);
  // console.log(actualThingCount);
  var score = 10 - (distance / actualThingCount * 10);

  return score < 0 ? 0 : score;
}
