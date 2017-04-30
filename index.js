var express = require('express');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));
var http = require('http');
var fs = require('fs');
var app = express();
var points = require('./api/points');

var app = express();
app.use('/', express.static('www'));
app.use('/api/points', points);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(clientErrorHandler);

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

app.listen(8880, function () {
  console.log('Listening on port ', 8880)
});

module.exports = app;