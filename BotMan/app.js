
/**
 * Module dependencies.
 */

var express		= require('express');
var routes		= require('./routes');
var user		= require('./routes/user');
var http		= require('http');
var path		= require('path');
var home 		= require('./routes/home');
var cmd 		= require('node-cmd');
var app 		= express();
var index		= require('./routes/index');

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',index.loadindex);
app.get('/home', home.loadhome);

app.post('/nodeBot',home.nodeBot);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


cmd.get('ls', function(data) {
	console.log('I am at: \n', data);
});

