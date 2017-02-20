var mongoose = require('mongoose');



//create a mongoose model so mg knows how to store our data
// so a table schema? It's a table schema...
//~ var Todo = mongoose.model('Todo', {
  //~ text: { type: String },
  //~ completed: { type: Boolean },
  //~ completedAt: { type: Number }	
	
//~ });
//this returns a function. we can call with 'new'. we can make new entries with this fn.





// add some more attributes http://mongoosejs.com/docs/validation.html
var Todo = mongoose.model('Todo', {
  text: { 
		type: String,
	  required: true,
	  minlength: 1,
	  trim: true		// auto trim. nice!
	  
	},
  completed: {
		type: Boolean,
		default: false 
	},
  completedAt: {
		type: Number,
		default: null
	}	
	
});


module.exports = {Todo};

//~ var newTodo = new Todo({
	//~ text: 'Cook dinner'
//~ });// this creates, does not update db

//~ //saves to database. save() return a promise
//~ newTodo.save().then( (doc) => {
	//~ console.log('Saved todo', doc);
	//~ //Saved todo { __v: 0, text: 'Cook dinner', _id: 58ab2ca7458336851bc6e3c6 }
//~ }, (e) => {  // if error
	//~ console.log('Unable to save todo');
//~ });


//~ var todo2 = new Todo({	
	//~ text: '   something   '
//~ });

//~ todo2.save().then( (doc) => {
	//~ console.log('Saved todo', doc);
//~ }, (e) => {  // if error
	//~ console.log('Unable to save todo');
//~ });

