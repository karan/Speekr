var Speak = function(text, lang) {
  var msg = new SpeechSynthesisUtterance();
  if (lang == 'zh') {
    msg.voice = 'zh-CN';
  } else if (lang == 'es') {
    msg.voice = 'es-ES';
  } else {
    msg.voice = 'en-US';
  }
  msg.text = text;
  window.speechSynthesis.speak(msg);
}
