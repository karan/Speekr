$(function () {
  var inPageTransition = false;

  function exitLogin () {
    $('.page.login .content').hide();
  }
  function enterHome () {
    $('.page.home').css('display', 'block');
  }

  // Event listeners

  $('.signinButton').click(function() {
    exitLogin();
    enterHome();
    inPageTransition = true;
  });
});