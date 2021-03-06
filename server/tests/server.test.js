const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');

const {Todo} = require('./../models/todo');

// we want some predicatable data in our database. Make some shit data
// adding ids to test for them later
const todos = [{
	  _id: new ObjectID(),
	  text: 'First test todo'
	}, {
		_id: new ObjectID(),
	  text: 'Second test todo',
	  completed: true,
	  completedAt: 333
	}];

// testing lifecycle method
//beforeEach lets us run code before every testing cycle
// specifies a function to run before each test case, and test cases are not run until we call done
beforeEach( (done) => {
	// Remove all items from the database
	//~ Todo.remove({}).then( () => {
		//~ done();
	//~ });
	//short syntax
	//Todo.remove({}).then( () => done() );
	
	Todo.remove({}).then( () => {  
	  return Todo.insertMany( todos );
	}).then( () => done() );
});

describe('POST /Todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text Beans';
		
		request(app)
		  .post('/todos')
		  .send({text})
		  .expect(200)
		  .expect( (res) => {
				expect(res.body.text).toBe(text );
			})
			.end( (err, res) => {  
				if ( err ) {
					return done(err);	// only to stop execution
				}
				
				// get all values to verify was added properly
				Todo.find({text}).then((todos) => {
				  expect(todos.length).toBe(1);
				  expect(todos[0].text).toBe(text);
				  done();	
				}).catch((e) => done(e) );
				
			});
	});
	
	
	// check new item does not get made. our challenge
	// beforeEach will run again before this check is run
	it('should not create todo with invalid body data', (done) => {
		request(app)
		  .post('/todos')
		  .send({})
		  .expect(400)
		  // no assertions about the body, since we're erroring
		  
		  .end( (err, res) => {
				if ( err ) return done(err);
			  
			  Todo.find().then((todos) => {
					expect(todos.length).toBe(2);  //expect length of db is 0. Now 2 because we're adding an array everytime.
					done();
				}).catch((e) => done(e) );
			
			});//.end
		
	});
	
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
		  .get('/todos')
		  .expect(200)
		  .expect( (res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
		  .get(`/todos/${todos[0]._id.toHexString()}`)
		  .expect(200)
		  .expect( (res) => { 
				 expect(res.body.todoResult.text).toBe(todos[0].text); // i called it todoResult!
			})
			.end(done);
	});
	
	it('should return a 404 if todo not found', (done) => {
		// make a request with a real object id
		var newid = new ObjectID();
		// make a new object id, won't be in collection
		// make sure you get a 404 back
		request(app)
		 .get(`/todos/${newid.toHexString()}`)
		 .expect(404)
		 .end(done);
	});
	
	
	it('should return 404 for non-object ids', (done) => {
		// pass in something like /todos/123
		request(app)
		 .get(`/todos/123`)
		 .expect(404)
		 .end(done);		
	});
	
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();
		
		request(app)
		  .delete(`/todos/${hexId}`)
		  .expect(200)
		  .expect( (res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end( (err, res ) => {
				if ( err )
				  return done(err);
				//else
				// query database using findById. try to find hexid one. This should fail. toNotExist 
				//expect(Tnull).toNotExist()
	      Todo.findById(hexId).then( (todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
				  
			});
		
	});
	
	it('should return 404 if todo not found', (done) => {
			var newid = new ObjectID().toHexString();
		// make a new object id, won't be in collection
		// make sure you get a 404 back
		request(app)
		 .delete(`/todos/${newid}`)
		 .expect(404)
		 .end(done);
		
	});
	
	it('should return 404 if objectID is invalid', (done) => {
		request(app)
		 .delete(`/todos/123`)
		 .expect(404)
		 .end(done);	
		
	});	
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		// grab id of first item
		var hexId = todos[0]._id.toHexString();
		var newText = 'Some updated text';
		// make patch request with id in it
		request(app)
		 .patch(`/todos/${hexId}`)
		 .send({text:newText, completed:true})   // update text, set completed to true
		 .expect(200)   // 1 assestion. get 200 back.
		 .expect( (res) => {
//			 console.log(res.body);
			 expect( res.body.todo.text ).toBe( newText );  // custom assertion. response body has text equal to what i sent,
			 expect( res.body.todo.completed).toBe(true);    // completed is true
			 expect( res.body.todo.completedAt).toBeA('number');  // completedAt is a number
		 })
		 .end(done);
		 
	})
	
	it('should clear completedAt when todo is not completed', (done) => {
		//grab ID of second todo item
		var hexId = todos[1]._id.toHexString();
		var newText = 'Some more updated text';
		
		request(app)
		 .patch(`/todos/${hexId}`)
		 .send({text:newText, completed:false})   // update text, set completed to false
		 .expect(200)   // assertions: 200
		 .expect( (res) => {
		   expect( res.body.todo.text).toBe( newText );
		   expect( res.body.todo.completed).toBe( false );
		   expect( res.body.todo.completedAt).toNotExist()
		 })	
		 .end(done);
		
		
		// assertions: 200, res body has changed text
		//  and completed is false, and completedAt is null (.toNotExist)
		
		
	});
	
});
