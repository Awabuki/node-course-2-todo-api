var mongoose = require('mongoose');

// make new model User
// property: email - required, trimmed, type string, min length 1
var User = mongoose.model('User', {
	email : {
		type: String,
		minlength: 1,
		required: true,
		trim: true
	}
	
});

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


