'use strict';

var express = require('express');
var cors = require('cors');
const fileMetadata = require('file-metadata');
const bodyParser = require('body-parser')
require('dotenv').config();


// require and use "multer"...
var multer = require('multer');
var upload = multer({dest:'uploads/'});
var app = express();



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

//POST file

const fileMt = (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.json({name: file.originalname, type:file.mimetype, size: file.size})
}

app.post('/api/fileanalyse',upload.single('upfile'), fileMt)
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
