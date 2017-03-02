const {SHA256} = require('crypto-js');	// recall this is like saying SHA256 = require...().SHA256;

//~ // this is a working example with just SHA256
var message = 'I am user number 3';
var hash = SHA256(message).toString();		// result is an object, so convert

console.log(`Message: ${message}`);
console.log('Hash:' + hash);

// Data we want to send back
var data = {
	id: 4
};
// what we do sent back..
var token = {
	data,
	//hash : SHA256(JSON.stringify(data) ).toString()
	hash : SHA256(JSON.stringify(data) + 'somesecret' ).toString()  // with salt
};
// to prevent someone from changing the id number in data, then re-hashing the token and sending it back,
//   we will be salting the hash. Add something to the hash that is unique and changes the value. Basically means
//  we add a secret string back onto the hash that the user does not know about. So they cannot change the id, re-hash,
//  and ask us to delete it. We do this for every token.

// make a change here to see the diff..
token.data.id = 5;		// trying to access user 5
token.hash = SHA256(JSON.stringify(token.data)).toString();  // but person doesn't have access to our salt

// to test..
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if ( resultHash === token.hash) { // then good
	console.log('Data was not changed');
} else {
	console.log('Data was changed. do not trust');
}


// method two

const jwt = require('jsonwebtoken');
// two functions : jwt.sign . takes data and signs it (creates hash)
// jwt.verify: takes token, makes sure was not messge diwth
var data = {
	id : 10
};

// takes object, and secret
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token , '123abc');
console.log('decoded', decoded);
// if messes with, code throws an error.

