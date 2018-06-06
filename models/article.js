var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/onlineblog');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
	createdAt: Date,
	user_id: String,
	heading: String,
	content: String,
	file: String
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;