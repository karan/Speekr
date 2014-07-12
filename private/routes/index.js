
exports.index = function (req, res){
  res.render('index');
};

exports.authError = function(req, res) {
  res.render('index', { success: 'false' });
};

exports.authSuccess = function(req, res) {
  // res.redirect('/play');
  res.send('Logged in fine'); 
};
