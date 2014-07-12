$(function () {
  var ANIMATION_DURATION = 400;
  var LONG_ANIMATION_DURATION = 1000;
  var ANIMATION_EASING = 'easeInQuad';
  var inPageTransition = false;

  var $loginPage = $('.page.login');
  var $homePage = $('.page.home');
  var $gamePage = $('.page.game');
  
  var $login = $('.page.login .content');
  var $home = $('.page.home .content');
  var $game = $('.page.game .content');

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
  function enterGame (language) {
    $gamePage.show();
    $game.addClass('transitionsDisabled');
    $game.css('transform', 'perspective(500px) translateZ(-100px)');
    $game.removeClass('transitionsDisabled');
    setTimeout(function() {
      $game.css('transform', 'perspective(500px) translateZ(0px)');
    }, 100);
    $game.addClass(language);
  }

  // Event listeners

  $('.signinButton').click(function() {
    if (!inPageTransition) {
      inPageTransition = true;
      exitLogin();
      enterHome();
    }
  });

  $('.languageButton').click(function(a, b) {
    var language;
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
      enterGame(language);
    }
  });
});
