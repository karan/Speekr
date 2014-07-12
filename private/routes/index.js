
exports.index = function (req, res){
  res.send('Hello');
};

exports.authError = function(req, res) {
  // res.render('index', { success: 'false' });
};

exports.authSuccess = function(req, res) {
  // res.redirect('/play');
};
