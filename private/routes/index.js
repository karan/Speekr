
exports.index = function (req, res){
  res.send('Hello');
};

exports.authError = function(req, res) {
  // res.render('index', { success: 'false' });
  res.send('Error while auth');
};

exports.authSuccess = function(req, res) {
  // res.redirect('/play');
  res.send('Logged in fine')
};
