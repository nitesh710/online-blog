var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/onlineblog');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
	createdAt: Date,
	article_id: String,
	user_id: String,
	name: String,
	comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;