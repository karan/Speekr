// returns indices of words in actualText that should be highlighted red

var Differ = function(actualText, userText, thingType, lang) {

  actualText = actualText.toLowerCase();
  userText = userText.toLowerCase();

  if (thingType == "1" && lang !== 'zh') {
    // for words, they just have to be equal
    return [{
      word: actualText,
      good: actualText.toLowerCase() === userText.toLowerCase()
    }];
  }

  var actualWordArray;
  var userWordArray;
  if (lang === 'zh') {
    actualWordArray = actualText.trim().split('');
    userWordArray = userText.trim().split('');
  } else {
    actualWordArray = actualText.trim().split(' ');
    userWordArray = userText.trim().split(' ');
  }

  var redIndexes = [];

  var userIndex;
  for (userIndex = 0; userIndex < userWordArray.length && userIndex < actualWordArray.length; userIndex++) {
    var userWord = userWordArray[userIndex];

    var oneMinusIndex = userIndex - 1 < 0 ? 0 : userIndex - 1;
    var twoMinusIndex = userIndex - 2 < 0 ? 0 : userIndex - 2;
    var onePlusIndex = userIndex + 1 > userWordArray.length - 1 ? userWordArray.length - 1 : userIndex + 1;
    var twoPlusIndex = userIndex + 2 > userWordArray.length - 1 ? userWordArray.length - 1 : userIndex + 2;
    
    if (userWord !== actualWordArray[userIndex] &&
        userWord !== actualWordArray[oneMinusIndex] &&
        userWord !== actualWordArray[twoMinusIndex] &&
        userWord !== actualWordArray[onePlusIndex] &&
        userWord !== actualWordArray[twoPlusIndex]) {
      redIndexes.push(userIndex);
    }
  }

  for (var actualIndex = userIndex; actualIndex < actualWordArray.length; actualIndex++) {
    redIndexes.push(actualIndex);
  }

  var wordArray = [];
  for (var i = 0; i < actualWordArray.length; ++i) {
    var actualWord = actualWordArray[i];
    wordArray.push({
      word: actualWord,
      good: redIndexes.indexOf(i) === -1
    });
  }

  return wordArray;
};
