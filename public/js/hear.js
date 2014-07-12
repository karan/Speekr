var Hear = function(lang, callback, stopcb) {
  if (!('webkitSpeechRecognition' in window)) {
    console.log("speech recognition not supported");
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = lang;
    stopcb(recognition);
    var interim_transcript = '';
    var final_transcript = '';
    recognition.start();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {  };

    recognition.onresult = function(event) {
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      callback(final_transcript);
    };

    recognition.onerror = function(event) {
      if (event.error == 'no-speech') {
        //
      }
      if (event.error == 'audio-capture') {
        //
      }
      if (event.error == 'not-allowed') {
        //
      }
    };

    recognition.onend = function() {
      callback(final_transcript);
    };
  }
};
