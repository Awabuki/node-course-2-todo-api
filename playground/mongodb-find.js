const {MongoClient, ObjectID} = require('mongodb');    // objectID is a function


// indicates computer, port, database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {   
	if (err) {
		return console.log('Unable to connect to MongoDB server');
		// or just console call, the return
	}
	console.log('Connected to mongo db server');

	// get vlaues out. if .find() is called with no arguments, all results are returned
	// returns a mongodb cursor. we can call functions on the cursor, like toArray
	// toArray returns a promise
	// Have to not close connection immeidately, as it f's up the promise.
	//db.collection('Todos').find().toArray().then( (docs) => {
	// add query in find call
	//db.collection('Todos').find({completed:false}).toArray().then( (docs) => {
	// query by id. cannot use ID string directly. need to use objectID object to access object with that id
	//~ db.collection('Todos').find({
		//~ _id: new ObjectID('58aa274c879434141ecbb94f')
		//~ }).toArray().then( (docs) => {
		//~ console.log('ToDos');
		//~ console.log(JSON.stringify(docs, undefined, 2 )) ;
	//~ }, (err) => {
		//~ console.log('Unable to fetch Todos', err);
	//~ });
	
		//~ db.collection('Todos').find().count().then( (count) => {
		//~ console.log(`Todos count: ${count}`);
	//~ }, (err) => {
		//~ console.log('Unable to fetch Todos', err);
	//~ });
	
	// Challenge. Get count of all users from user table with your name (sb ~3)
	db.collection('Users').find({name:'Jeremy'}).toArray().then( (docs) => {
		console.log('Users:');
		console.log(JSON.stringify(docs, undefined, 2 )) ;
	}, (err) => {
		console.log('Unable to fetch Todos', err);
	});
	
	//db.close();
	
});
