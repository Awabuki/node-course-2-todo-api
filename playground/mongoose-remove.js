const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// mongoose gives 3 methods for deletion
// todo.remove. give it criteria, it removes all. cannot pass in nothing. to remove all, pass in {}
//~ Todo.remove({}).then( (result) => {
	//~ console.log(result);  // tells us how many were removed, we do NOT get the information back
//~ });

// works like you'd expect..., but does return the result it removed.
//Todo.findOneAndRemove

// Take a guess! :P Removal returns the doc
//Todo.findByIdAndRemove


Todo.findByIdAndRemove('58af99ee3da20d4d3e141097').then( (doc) => {
	console.log(doc);
});
