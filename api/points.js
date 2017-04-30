var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Pool = require('pg').Pool;

// var pool = new Pool({
//   host: 'localhost',
//   user: 'osm',
//   password: 'asdasdasd',
//   database: 'test',
//   max: 500, // max number of clients in the pool
//   idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/get',function(req,res){

  res.json(["one","2"]);
  res.end();
});

router.post('/add',function(req,res){
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

module.exports = router;