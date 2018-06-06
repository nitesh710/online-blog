var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/onlineblog');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;