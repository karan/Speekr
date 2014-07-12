var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var db = require('./private/db/connect');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// Connect to db
db.connect();

//
// Routes
//

var get = require('./routes/get');
var post = require('./routes/post');

// GET
app.get('/', get.index);

// POST

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});