var express = require('express');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));
var http = require('http');
var fs = require('fs');
var app = express();
var subpath = express();
var expressSession = require('express-session');
var cookieParser = require('cookie-parser')
var pg = require('pg');

var Pool = require('pg').Pool;
var pool = new Pool({
host: 'localhost',
user: 'osm',
password: 'asdasdasd',
database: 'test',
max: 500, // max number of clients in the pool
idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});

var app = express();
app.use(cookieParser());
app.use(expressSession({secret:'QSbTN4z6dygfkcfsLQe5NRRT'}));
app.use('/', express.static('www'));
app.use('/swagger/', express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/v1", subpath);
app.use(clientErrorHandler);

var swagger = require("swagger-node-express").createNew(subpath);
swagger.setApiInfo({
        title: "RunToLive API",
        description: "API to do something, manage something...",
        termsOfServiceUrl: "",
        contact: "yourname@something.com",
        license: "",
        licenseUrl: ""
});
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
  var domain = 'localhost';
  if(argv.domain !== undefined)
      domain = argv.domain;
  else
      console.log('No --domain=xxx specified, taking default hostname "localhost".')

// Configure the API port
  var port = 8888;
  if(argv.port !== undefined)
      port = argv.port;
  else
      console.log('No --port=xxx specified, taking default port ' + port + '.')

  // Set and display the application URL
  var applicationUrl = 'http://' + domain + ':' + port;
  swagger.configure(applicationUrl, '1.0.0');

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

app.listen(port, function () {
  console.log('Listening on port ', port)
});

app.get('/swagger/', function (req, res) {
        res.sendFile(__dirname + '/dist/index.html');
});

app.post('/api/v1/test', (req, res, next) => {
  var query = pool.query("SELECT * FROM Emergency",  function (err, result) {
    if(err) {
    pool.end();
    return;
    }

    res.json(result.number);
    pool.end();
    res.status(200);
    res.end();
  });  
});