// index.js
// middleware routing 

// single tweet route
// router.get('/users/:name/tweets/:id', function(req, res) {
	
// })

// wrap everything in a function to use socket.io in app.js
module.exports = function (io) {

	var express = require('express');
	var router = express.Router();

	var tweetBank = require('../tweetBank');

	// routing
	router.get('/', function(req, res) {
		var tweets = tweetBank.list();
		res.render('index', {title: 'Twitter.js', tweets:tweets, showForm:true});
	});

	// single-user route & view
	router.get('/users/:name', function(req, res) {
		var name = req.params.name;
		var list = tweetBank.find({name: name});
		res.render('index', {title: 'Twitter.js - Posts by ' + name, tweets:list, showForm:true, name:name});
	});

	// handle form submission 
	router.post('/submit', function(req, res) {
		var name = req.body.name;
		var text = req.body.text;
		tweetBank.add(name, text);
		io.sockets.emit('new_tweet', {name:name, text:text}); 
		res.redirect('/');
	});

	return router;
}



