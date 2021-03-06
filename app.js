// simple twitting application

var express = require('express');		// server framework
var app = express(); 					// server instance
var swig = require('swig');				// html template
var routes = require('./routes/');		// routing files
var router = express.Router();			// router middleware instance
var bodyParser = require('body-parser');// parse body msg
var socketio = require('socket.io'); 	// web socket btw server and client

// set server as listen
var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('server listening at http://%s:%s', host, port)

});

var io = socketio.listen(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// mount routes functions 
app.use('/', routes(io));

// designating entire '/public' as serving static content
app.use(express.static(__dirname + '/public'));

// use swig.renderFile to render html
app.engine('html', swig.renderFile);

// set default 'view engine' to html
app.set('view engine', 'html');

// set views path
app.set('views', __dirname + '/views');

// turn off caching for dev 
swig.setDefaults( { cache: false });

// pass in some data
var people = [ {name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

// send rendered files
// app.get('/', function(req, res) {
// 	// res.send('Hello World!')
// 	res.render('index', {title: 'Hall of Fame', people: people});
// })

// when accessing /news
// app.get('/news', function(req, res) {
// 	res.send('You hav reached /news!')
// })



