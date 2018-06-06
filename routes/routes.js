var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');

var User = require('../models/user');
var Article = require('../models/article');
var Comment = require('../models/comment');
var Image = require('../models/image');

// register 
router.post('/register/', function(req, res) {
    var user = new User(req.body);

    user.save()
        .then(item => {
            res.send('User is saved to database..');
        })
        .catch(err => {
            res.send("User is unabled to save to database.")
        });
});

// login
router.post('/login/', function(req, res) {
    User
        .findOne({
            email: req.body.email
        })
        .exec((err, user) => {
            if (!user) {
                return res.send("User not found!");
            } else {
                if (user.password === req.body.password) {
                    return res.send({
                        "code": 200,
                        "message": "login successfull",
                        "data": user
                    });
                } else {
                    return res.send('Invalid Credentials!');
                }
            }
        });
});

router.get('/getUser/:id', function(req, res){
    User
    .findOne({_id: req.params.id})
    .exec( (err, user) =>{
        if (!user) {
            return res.send({"code": 404, "msg": "No User Found!"});
        }
        else{
            return res.send({"code": 200, "msg": "User Found!", "data": user});
        }
    });
});

// article
router.post('/addArticle/', function(req, res) {
    req.body.createdAt = new Date();
    var article = new Article(req.body);

    article.save()
        .then(item => {
            res.send('Article is saved to database..');
        })
        .catch(err => {
            res.send('Article is note saved to database..');
        });
});

router.get('/getArticles/', function(req, res) {
    Article
        .find({})
        .exec((err, articles) => {
            if (!articles) {
                return res.send('No Articles!');
            } else {
                return res.send(JSON.stringify(articles));
            }
        });
});

router.get('/getArticle/:id', function(req, res) {
    Article
        .findOne({
            _id: req.params.id
        })
        .exec((err, article) => {
            if (!article) {
                return res.send("No Article Found!");
            } else {
                return res.send({
                    "code": 200,
                    "message": "Article Found!",
                    "data": article
                });
            }
        });
})

router.post('/addComment/', function(req, res) {
    req.body.createdAt = new Date();
    var comment = new Comment(req.body);

    comment.save()
        .then(item => {
            res.send('Comment saved successfully.');
        })
        .catch(err => {
            res.send('Comment not saved.');
        });
});

router.get('/getAllComments/:id', function(req, res) {
    Comment
        .find({
            article_id: req.params.id
        })
        .exec((err, comments) => {
            if (!comments) {
                return res.send('No Comments!');
            } else {
                return res.send(JSON.stringify(comments));
            }
        });
});

router.post('/upload/', function(req, res) {
    
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        var oldpath = files.file.path;
        var newpath = 'D:/online-blog/public/uploads/' + files.file.name;

        // fs.rename(oldpath, newpath, function(err) {
        //     if (err) throw err;
        //     res.write('File uploaded and moved!');
        //     res.end();
        // });

        var imagePath = './uploads/'+ files.file.name;

        mv(oldpath, newpath, function(err) {
            if (err) throw err;

            // var img = new Image;
            // img.img.data = fs.readFileSync(newpath);
            // img.img.contentType = 'image/jpeg';
            // img.save(function(err, img) {
            //     if (err) throw err;
            //     console.log("Image save to database.");
            // });

            // res.write('File uploaded and moved!');

            res.send({
                "data": imagePath
            });
            res.end();
        });
    });
});

router.post('/saveImage/', function(req, res){
    
    var image = new Image(req.body);

    image.save()
    .then( item =>{
        res.send("Image saved to database");
    })
    .catch( err =>{
        // console.log(err);
        res.send("Image not saved to database");
    });
});

router.get('/getImage/:id', function(req, res) {
    Image
        .findOne({user_id: req.params.id})
        .exec((err, image) => {
            if (err){
                console.log(err);
            }

            res.send(image);
        });
});

router.get('/getArticleId/:id', function(req, res) {
    Article
        .findOne({
            user_id: req.params.id
        })
        .exec((err, article) => {
            if (!article) {
                return res.send("No Article Found!");
            } else {
                return res.send({
                    "code": 200,
                    "message": "Article Found!",
                    "data": article._id
                });
            }
        });
})
module.exports = router;