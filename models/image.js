var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/onlineblog');

var Schema = mongoose.Schema;

var imageSchema = new Schema({
	img: String,
	user_id: String
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;