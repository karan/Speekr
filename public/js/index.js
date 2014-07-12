$(function () {
  var ANIMATION_DURATION = 400;
  var ANIMATION_EASING = 'easeInQuad';
  var inPageTransition = false;

  var $loginPage = $('.page.login');
  var $homePage = $('.page.home');
  
  var $login = $('.page.login .content');
  var $home = $('.page.home .content');

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
    $homePage.css('display', 'block');
    $home.css('top', '100%').animate({
      top: '0%'
    }, {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASING,
      complete: function () {
        console.log('hi');
      }
    });
  }

  // Event listeners

  $('.signinButton').click(function() {
    exitLogin();
    enterHome();
    inPageTransition = true;
  });
});