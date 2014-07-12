var express = require('express'),
    http = require('http'),
    routes = require('./private/routes'),
    // user = require('./private/routes/user'),
    path = require('path'),
    db = require('./private/db/connect'),
    passport = require('passport'),
    auth = require('./private/auth'),
    Constants = require('./private/constants');

var app = express();
var RedisStore = require('connect-redis')(express);
var redis;

if (Constants.REDISTOGO_URL) {
  console.log("using reditogo");
  rtg   = require('url').parse(Constants.REDISTOGO_URL);
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
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'bower_components')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({
    secret: 'YOLO',
    store: new RedisStore({ client: redis })
  }));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

//
// Routes
//

// require('./save_gen');

// GET
app.get('/', routes.index);
app.get('/auth/linkedin', passport.authenticate("linkedin",
  { scope: ['r_basicprofile', 'r_emailaddress'] }));
app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/auth/error' }), 
  routes.authSuccess);
app.get('/auth/error', routes.authError);

// POST


require('./private/pass.js')(passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
