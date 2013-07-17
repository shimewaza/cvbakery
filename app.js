/**
 * Module dependencies.
 */
var express = require('express'),
  http = require('http'),
  path = require('path'),
  util = require('util'),
  mongoose = require('mongoose');

var map = require('./maproutecontroller');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'selink'
  }));
  app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: path.join(__dirname, 'public/upload')
  }));
  app.use(express.methodOverride());
  // app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next) {

    var excludePath = ['/', '/login', '/tempaccount/create'];

    if (excludePath.indexOf(req.path) != -1) {
      next();
    } else if (/\/activate\/.*/.test(req.path) || /\/myresume\/.*/.test(req.path)) {
      next();
    } else if (!req.session.accountId) {
      res.status(401).send("ログインしてください。");
    } else {
      next();
    }

  });
});

app.configure('development', function() {
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

mongoose.set('debug', true);

// データベース接続初期化
mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('open', function() {
  console.log("db connected.");
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/home', function(req, res) {
  res.json(req.session.accountInfo);
});


// データモデル名称
var prefixes = ['tempaccount', 'account', 'resume'];

// ルートとデータモデルのマッピング
prefixes.forEach(function(prefix) {
  map.mapModelRoute(app, prefix);
});

map.mapRoute(app);

// サーバを起動
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});