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

router.post('/test',function(req,res){
    var query = pool.query('SELECT * FROM public."Emergency";',  function (err, result) {
    if(err) {
      console.log(err);
      return;
    }
    console.log(result.rows);

    res.json(result.rows);
    res.status(200);
    res.end();
  });
});

router.post('/ping',function(req,res){
    var query = pool.query('SELECT id, ST_AsText(location), type_id FROM public."Events" e WHERE ST_DWithin(e."location", ST_SetSRID(ST_MakePoint('+req.body.lat+','+req.body.lon+'), 4326),'+req.body.radius+') ORDER BY ST_Distance(e."location", ST_SetSRID(ST_Point('+req.body.lat+','+req.body.lon+'),4326));',  function (err, result) {
    if(err) {
      console.log(err);
      return;
    }
    console.log(result.rows);

    res.json(result.rows);
    res.status(200);
    res.end();
  });
});

router.post('/add',function(req,res){
    var query = pool.query('INSERT INTO public."Events"(user_id, type_id, location, radius) VALUES ('+req.body.userId+', '+req.body.typeId+', ST_SetSRID(ST_MakePoint('+req.body.lat+','+req.body.lon+'), 4326), '+req.body.radius+');',  function (err, result) {
    if(err) {
      console.log(err);
      return;
    }
    console.log(result.rows);

    res.json(result.rows);
    res.status(200);
    res.end();
  });
});

module.exports = router;