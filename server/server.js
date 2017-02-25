require('./config/config.js');

const _=require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
// stuff for herokyu
const port = process.env.PORT; // || 3000; now set above

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


// add another route for GETS
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});   // create an object called todos, and send that back (so we could add more properties
	}, (e) => {
		res.status(400).send(e);
	});
});

// Get /todos/12345 
// get that value, and use it to find the id( ":id" is the variable name)
app.get('/todos/:id', (req, res) => {
	// we're using something off request. parameters
	var id = req.params.id;
	//validate the id using object using isvalid
	if ( !ObjectID.isValid(id))
	  return res.status(404).send(); 	 // if not, reqponse with 404. Do not continue
	
	// use findbyid to find matching
	Todo.findById(id).then( (todoResult ) => {
	  // success
	  if ( todoResult )
	    res.status(200).send({todoResult});  // if todo - send it back
	  else
	   res.status(404).send();
	    
	    // if no todo, send back 404 with empty body
	   
		
	}, (e) => {  // error (he used .catch instead. ok.
	    // send back 400 and nothing
	    res.status(400).send();
	});
	  
	
});

app.delete('/todos/:id', (req, res) => {
	// get the id
		var id = req.params.id;
	
	// validate the id
	if ( !ObjectID.isValid(id) )
		return res.status(404).send();
	 // not valid, return a 404
	
	// remove todo by id
	Todo.findByIdAndRemove(id).then( ( doc ) => {
	  // success
	    // if no doc, send 404 (id not found)
	    
		if ( !doc )
		  return res.status(404).send();
		else
			return res.status(200).send({todo:doc});
		  // if doc, send doc back with a 200
	}).catch( (e) => {
	  // error
	    // return 400 empty body
		return res.status(400).send();		
	});
	
	
});

// patch route (update todo items)
app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	// updates stored in body. capture using lodash functions
	// We pick the specific ones we want (text, completed), so we dont save invalid properties
	// basically "body" will become the mongo document we save, as it has all the same properties (except id)
	var body = _.pick(req.body, ['text', 'completed']);
	
	// validate the id
	if ( !ObjectID.isValid(id) )
		return res.status(404).send();
		
	if ( _.isBoolean(body.completed) && body.completed ) {
		// We add to the object 
		body.completedAt = new Date().getTime();
	}
	else {
		body.completed = false;
		body.completedAt = null;
	}

	// find id, set entire doc to body, retur
  Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo) => {
		if (!todo)
		  return res.status(404).send();
		
		res.send({todo});
		
	}).catch( (e) => {
		res.status(400).send();
	})	
	
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};
