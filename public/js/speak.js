var Speak = (function(text, lang, endcb) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.onend = endcb;

  if (lang == 'zh') {
    msg.lang = 'zh-CN';
  } else if (lang == 'es') {
    msg.lang = 'es-ES';
  } else if (lang == 'fr') {
    msg.lang = 'fr-FR';
  } else {
    msg.lang = 'en-US';
  }

  speechSynthesis.speak(msg);
});
