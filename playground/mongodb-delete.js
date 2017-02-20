const {MongoClient, ObjectID} = require('mongodb');    // objectID is a function


// indicates computer, port, database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {   
	if (err) {
		return console.log('Unable to connect to MongoDB server');
		// or just console call, the return
	}
	console.log('Connected to mongo db server');

  // Removing data
  // deleteMany removes many at once. deleteOne targets one and removes it.
  // findOneAndDelete removes an individual item, and returns the item deleted.
  
  // deleteMany (remove the duplicates we made)
  //~ db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) => {
		//~ console.log(result);
	//~ });
  //result: { n: 3, ok: 1 }, (much more stuff)

  // deleteOne (regardless of matches
  //~ db.collection('Todos').deleteOne({text:'Eat lunch'}).then( (result) => {
		//~ console.log(result);
	//~ });

  //~ //findOneAndDelete. Returns document in .value. returns .ok and .lastErrorObject also (has n property, =1)
  //~ db.collection('Todos').findOneAndDelete({completed:false}).then( (result) => {
		//~ console.log(result);
	//~ });

 // challenge:
 
 // delete all jeremys by name
 //~ db.collection('Users').deleteMany({name:'Jeremy'}).then( (result) => {
	 //~ console.log('deleted completed. ';
 //~ });
 // worked
 
 // delete another by id, by findoneand delete. object id '123' did not work, though we have one in there.
	db.collection('Users').findOneAndDelete({_id: new ObjectID('58aa28b31418761490555ad5') }).then( (result) => {
		console.log(result);
	}); // worked

	//db.close();	
});
