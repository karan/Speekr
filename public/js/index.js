$(function () {
  var ANIMATION_DURATION = 400;
  var LONG_ANIMATION_DURATION = 1000;
  var ANIMATION_EASING = 'easeInQuad';

  var language; // current language
  var inPageTransition = false;
  var round = {}; // data of the current round

  var $loginPage = $('.page.login');
  var $homePage = $('.page.home');
  var $gamePage = $('.page.game');
  
  var $login = $('.page.login .content');
  var $home = $('.page.home .content');
  var $game = $('.page.game .content');

  var $gameText = $game.find('.gameArea .text');

  function exitLogin () {
    $login.animate({
      top: '-100%'
    }, {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASING,
      complete: function () {
        $loginPage.hide();
        $login.css('top', '0%');
      }
    });
  }
  function enterHome () {
    $homePage.show();
    $home.css('top', '100%').animate({
      top: '0%'
    }, {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASING,
      complete: function () {
        inPageTransition = false;
      }
    });
    $('header').css('visibility', 'visible');
  }

  function exitHome () {
    // Split the home page into 2 halves and slide like curtains
    var $left = $home.clone();
    var $right = $home.clone();
    $home.hide();

    // Create DOM
    var $leftCurtain = $('<div>').addClass('curtain');
    var $rightCurtain = $('<div>').addClass('curtain');
    $leftCurtain.html($left);
    $rightCurtain.html($right);
    $homePage.append($leftCurtain, $rightCurtain);

    // Position curtains
    $leftCurtain.css({
      left: '0%'
    });
    $rightCurtain.css({
      right: '0%'
    });
    $right.css({
      left: '-100%'
    });

    // Animate
    $leftCurtain.animate({
      left: '-50%'
    }, {
      duration: LONG_ANIMATION_DURATION,
      ease: ANIMATION_EASING
    });
    $rightCurtain.animate({
      right: '-50%'
    }, {
      duration: LONG_ANIMATION_DURATION,
      ease: ANIMATION_EASING,
      complete: function () {
        // Reset home
        $home.show();
        // Exit home page
        $homePage.hide();
      }
    });
  }
  function enterGame () {
    $gamePage.show();
    $game.addClass('transitionsDisabled');
    $game.css('transform', 'perspective(500px) translateZ(-100px)');
    $game.removeClass('transitionsDisabled');
    setTimeout(function() {
      $game.css('transform', 'perspective(500px) translateZ(0px)');
    }, 100);
    $game.addClass(language);

    var animationDelay = 400;

    // Button animation
    $game.find('.bigbutton').css('opacity', 0).delay(animationDelay).css({
      top: '100px'
    }).animate({
      top: '0px',
      opacity: 1,
    }, {
      duration: LONG_ANIMATION_DURATION,
      ease: ANIMATION_EASING
    });

    // Text animation
    $game.find('.gameArea .text').delay(animationDelay).css({
      'opacity': 0,
      bottom: '100px'
    }).animate({
      bottom: '0px',
      opacity: 1,
    }, {
      duration: LONG_ANIMATION_DURATION,
      ease: ANIMATION_EASING,
      complete: function () {
        inPageTransition = false;
      }
    });

    startRound();
  }

  function startRound () {
    // Get data for round
    // $.getJSON('/next_thing', function (data) {
      // temp
      data = {
        thing: 'what are you doing',
        thingType: '2'
      };

      round.thing = data.thing;
      round.thingType = data.thingType;

      // Set the font size relative to the text size
      var fontSize = 140/Math.sqrt(round.thing.length);
      $gameText.css({
        fontSize: fontSize + 'px'
      });
      $gameText.text(round.thing);

      setTimeout(function () {
        // Play thing
        Speak(round.thing, language, function () {
          
        });
      }, 3000);
    // });
  }

  function endRound (score) {
    // save score and move on to next word
    console.log(score);
  }

  // Ajax requests
  
  $.ajax({
    url: '/user',
    success: function(user) {
      // load up profile, take to languages page
      $('.signinButton').click();
      $('.profilePhoto').attr('src', user.photo);
      $('.name').text(user.name);
    },
    error: function(xhr,status,error) {
      // take to signup page
      $loginPage.show();
    }
  });

  // Event listeners

  $('.signinButton').click(function() {
    if (!inPageTransition) {
      inPageTransition = true;
      exitLogin();
      enterHome();
    }
  });

  $('.bigbutton').click(function () {
    if (!inPageTransition) {
      $('.bigbutton').addClass('active');
      Hear(language, function (userThing) {
        $('.bigbutton').removeClass('active');
        console.log(round.thing);
        console.log(userThing);
        console.log(round.thingType);
        var score = Score(round.thing, userThing, round.thingType);
        endRound(score);
      });
    }
  });

  $('.languageButton').click(function(a, b) {
    var $this = $(this);
    if ($this.hasClass('en')) {
      language = 'en';
    } else if ($this.hasClass('es')) {
      language = 'es';
    } else if ($this.hasClass('fr')) {
      language = 'fr';
    } else if ($this.hasClass('zh')) {
      language = 'zh';
    }
    if (!inPageTransition) {
      inPageTransition = true;
      exitHome();
      enterGame();
    }
  });
});
