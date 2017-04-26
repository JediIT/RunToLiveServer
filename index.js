var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var app = express();
var expressSession = require('express-session');
var cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(expressSession({secret:'QSbTN4z6dygfkcfsLQe5NRRT'}));
app.use('/', express.static('www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(clientErrorHandler);

app.get('/getdata',function(req,res){
	res.json({'test':'test'});
	res.end();
});

app.post('/postdata',function(req,res){
	res.status(400);
	res.json(["one","2"]);
	res.end();
});

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

app.listen(8888, function () {
  console.log('Listening on port ', 8888)
});