var express = require('express'),
    routes = require('./private/routes'),
    user = require('./private/routes/user'),
    path = require('path'),
    passport = require('passport'),
    auth = require('./private/auth');


var app = express();
var db = require('./private/db/connect');
var RedisStore = require('connect-redis')(express);


var redis;
if (process.env.REDISTOGO_URL) {
  console.log("using reditogo");
  rtg   = require('url').parse(process.env.REDISTOGO_URL);
  redis = require('redis').createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(':')[1]); // auth 1st part is username and 2nd is password separated by ":"
} else {
  console.log("using local redis");
  redis = require("redis").createClient();
}

app.configure(function(){
  app.set('port', process.env.PORT || 8888);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(function(req, res, next) {
      if (req.url != '/favicon.ico') {
          return next();
      } else {
          res.status(200);
          res.header('Content-Type', 'image/x-icon');
          res.header('Cache-Control', 'max-age=4294880896');
          res.end();
      }
  });
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({
      secret: 'YOLO',
      store: new RedisStore({ client: redis })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

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


require('./private/pass.js')(passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
