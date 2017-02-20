var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// use middleware
app.use(bodyParser.json());  // lets use send json to express app

// to create a resource, create a post http object and send it.

// to set up a route ..., use post with url and callback
// /todos for creating new todos
app.post('/todos', (req, res) => {
	// get body data that was sent from client. need body parser
	//console.log(req.body);
	var todo = new Todo({
		text: req.body.text
	});
	
	todo.save().then( (doc) => {
	  res.send(doc);		// send doc back to user	
	}, (e) => {
		res.status(400).send(e);		// send error back
	});
});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {app};
