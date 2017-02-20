//const MongoClient = require('mongodb').MongoClient;   // want the mongo client
// exact same ES6 version: const {MongoClient} = require('mongodb');  
	
const {MongoClient, ObjectID} = require('mongodb');    // objectID is a function

//~ var obj = new ObjectID();
//~ console.log(obj);

// We can get a tool to make IDs like mongo does

// indicates computer, port, database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {   
	if (err) {
		return console.log('Unable to connect to MongoDB server');
		// or just console call, the return
	}
	console.log('Connected to mongo db server');
	
	  //~ // connect or create
	  //~ // insertOne means to insert one "document" (row). We specify the fields (columns)
	  //~ // also has a callback function when completed. Takes error and result
	//~ db.collection('Todos').insertOne({
		//~ text: 'Something to do',
		//~ completed: false
	//~ }, (err, result) => {
		//~ if (err) {
		  //~ return console.log('Unable to insert todo', err);
		//~ }
		
		//~ console.log(JSON.stringify( result.ops, undefined, 2 ) );
	//~ });
	
	//~ // insert new doc into Users collection (name, age, location)
	//~ db.collection('Users').insertOne( {
		//~ name: 'Jeremy',
		//~ age: 40,
		//~ location: 'Basement'
	//~ }, (err, result ) => {  // callback from insert
		//~ if ( err )
		  //~ return console.log('Something dun fucked up', err);
		
		//~ // result.ops is an array of ALL documents that got inserted.
		//~ //console.log(JSON.stringify(result.ops, undefined, 2 ) );
		//~ // we cna access the id field, and call fns on it.
		//~ console.log( result.ops[0]._id.getTimestamp() );
		
	//~ });
	
	
	db.close();
	
});
