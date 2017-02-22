const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//~ var id = '58ab68ade3a11318335a501011';
//~ //var id = '68ab68ade3a11318335a5010';

//~ if ( !ObjectID.isValid(id)) {
	//~ console.log('ID not valid');
//~ }

//~ // extension on todo find
//~ // mongoose will convert stirngs to object ids for us!
//~ Todo.find({
	//~ _id: id
//~ }).then((todos) => {
	//~ console.log('Todos:', todos);
//~ });

//~ // findOne returns one doc at MOST! For filter, gets first one it finds
//~ Todo.findOne({
	//~ _id: id
//~ }).then((todo) => {
	//~ console.log('Todo:', todo);
//~ });

// if no matches found, no error happens. returns null (or [] for find()
// however an error WILL trigger if the ID string is NOT of the proper format (eg too long)
// we can also valiedate id strings from mongoose objectid object

// Another to find by id. Of course. Pass id in as string. Best to use when searching by an ID
//~ Todo.findById(id).then((todo) => {
	//~ if (!todo) {   // since no matches IS NOT an error, see if nothing came back
		//~ return console.log('ID not found');
	//~ }
	//~ console.log('Todo By ID:', todo);
//~ }).catch( (e) => console.log(e) );

// query users collection (get id from robo mongo)
// need user model
// use User.findById. handle 3 cases
User.findById('58ab317c4610c4ee1d9e59fe').then( (user) => {
	if ( !user) 
	  return console.log('No match for ID found');
	
	console.log('Found user:', user);
	
}).catch( (e) => console.log(e) );
// could have used the second callback feature.

// query works, no matches
// user was found
// errors. print error object to screen. don't use isValid
