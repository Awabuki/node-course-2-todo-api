const {MongoClient, ObjectID} = require('mongodb');    // objectID is a function


// indicates computer, port, database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {   
	if (err) {
		return console.log('Unable to connect to MongoDB server');
		// or just console call, the return
	}
	console.log('Connected to mongo db server');

  //~ //findOneAndUpdate. Guess what that does :P
  //~ // arguments: filter, update(s), options, callback (or omit the callback to have it return a promise)
  //~ // update commnads listed on webpage
	//~ db.collection('Todos').findOneAndUpdate( {
		  //~ _id: new ObjectID('58ab1c83898f59abaad7b250')
		//~ }, {
			//~ $set: {
				//~ completed: true
			//~ }
		//~ }, {
			//~ returnOriginal: false  // we want updated document, not original
		//~ } ).then( (result) => { console.log(result) } );

  db.collection('Users').findOneAndUpdate( {
		_id: new ObjectID('58ab232c898f59abaad7b3d7')
		}, {
			$set: { name: 'Jeremy' }, $inc: { age: 1 }
		},  {
			returnOriginal: false  // we want updated document, not original
		} ).then( (result) => {
		 console.log(result);
		} );

	//db.close();	
});
