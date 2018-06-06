var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var formidable = require('formidable');

var route = require('./routes/routes');

var app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json({limit: '50mb'}));

app.use(express.static(__dirname + '/public/'));

// var storage = multer.diskStorage({ //multers disk storage settings
//     destination: function(req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function(req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
//     }
// });

// var upload = multer({ //multer settings
//     storage: storage
// }).single('file');

app.use('/api', route);

app.listen(3000, function() {
    console.log('Server listening at port http://localhost:3000');
});