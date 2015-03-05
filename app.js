// simple twitting application

var express = require('express');
var app = express(); 

app.get('/', function(req, res) {
	res.send('Hello World!')
})

app.get('/news', function(req, res) {
	res.send('You hav reached /news!')
})

var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('server listening at http://%s:%s', host, port)

})