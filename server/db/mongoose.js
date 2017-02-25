const mongoose = require('mongoose');
//another thing built ON mongo...

//tell mongoose we want to use the BUILT IN promise library, not the addon
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);
// don't need to wait for connect to finish, it 'takes care of it'...


module.exports = { mongoose };  // same as { mongoose: mongoose }


