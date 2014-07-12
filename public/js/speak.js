var Speak = (function(text, lang, endcb) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.onend = endcb;

  if (lang == 'zh') {
    msg.voice = 'zh-CN';
  } else if (lang == 'es') {
    msg.voice = 'es-ES';
  } else if (lang == 'fr') {
    msg.voice = 'fr-FR';
  } else {
    msg.voice = 'en-US';
  }

  speechSynthesis.speak(msg);
});
