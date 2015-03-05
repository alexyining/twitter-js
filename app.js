// simple twitting application

var express = require('express');
var app = express(); 
var swig = require('swig');

// set server as listen
var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('server listening at http://%s:%s', host, port)

})

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
app.get('/', function(req, res) {
	// res.send('Hello World!')
	res.render('index', {title: 'Hall of Fame', people: people});
})


// app.get('/news', function(req, res) {
// 	res.send('You hav reached /news!')
// })

