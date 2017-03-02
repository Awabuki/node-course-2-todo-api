const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// make system a bit more flexible, so store a schema for the user
// We cannot add methods to User (because it's from mongoose?), so request
//  a function be added through mongoose
var UserSchema = new mongoose.Schema({
  //  take an object.cut and paste what we used to have in the var User call below
	email : {
			type: String,
			minlength: 1,
			required: true,
			trim: true,
			unique: true,
			validate: {
				/*validtor: (value) => {
					// have to install 3rd party library. npm validtor
					return validtor.isEmail(value);
				},*/ // easier way, just use the function
				validator: validator.isEmail,  // I guess it just assumes the input variable?
				message: '{VALUE} is not a valid email'
			}
		},
		password: {
			type: String,
			required: true,
			minlength: 6
		},
		// tokens is a feature in mongo database (also is an array)
		tokens: [{ 
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}]  	
});

// overriding a method here, one that exists.
UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();	// converts our class into regualr object, that we can use _.pick on
	
	return _.pick(userObject, ['_id', 'email']);
};

// add instance methods off methods object. Not an arrow function because we need THIS! :p
UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString(); // access is access:access.
	// this gives us back a regular array
	user.tokens.push({ access, token});
	// save
	return user.save().then( () => {
		return token;  // ??
	});
};

// make new model User
// property: email - required, trimmed, type string, min length 1
// Using custom validation from http://mongoosejs.com/docs/validation.html
// validate takes two arguments: a function, 
var User = mongoose.model('User', UserSchema);  // pass in user schema now.
	
	

module.exports = { User };

//~ // create new user. try without email, then one with
//~ var newUser = new User( {
	//~ email: 'home@email.com'
//~ });

//~ newUser.save().then( (doc) => {
	//~ console.log('Saved user', doc);
//~ }, (e) => {  // if error
	//~ console.log('Unable to save user', e);
//~ });


