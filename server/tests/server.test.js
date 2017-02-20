const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');

const {Todo} = require('./../models/todo');

// we want some predicatable data in our database. Make some shit data
const todos = [{
	  text: 'First test todo'
	}, {
	  text: 'Second test todo'	
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
