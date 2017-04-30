var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require("pg");
var conString = "pg://user:password@localhost:5432/example";
var client = new pg.Client(conString);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));
client.connect();

router.post('/ping',function(req,res){
  var query = client.query('SELECT id, ST_AsText(location), type_id FROM public."Events" e WHERE ST_DWithin(e."location", ST_SetSRID(ST_MakePoint('+req.body.lat+','+req.body.lon+'), 4326),'+req.body.radius+') ORDER BY ST_Distance(e."location", ST_SetSRID(ST_Point('+req.body.lat+','+req.body.lon+'),4326));', function(err, result) {
      if (err) {
          console.log(err);
          client.end();
      }
  });

  query.on("end", function (result) {
    res.json(result.rows);
    client.end();
    res.status(200);
    res.end();
  });
});

router.post('/add',function(req,res){
  var query = client.query('INSERT INTO public."Events"(user_id, type_id, location, radius) VALUES ('+req.body.userId+', '+req.body.typeId+', ST_SetSRID(ST_MakePoint('+req.body.lat+','+req.body.lon+'), 4326), '+req.body.radius+');', function(err, result) {
      if (err) {
          console.log(err);
          client.end();
      }
  });

  query.on("end", function (result) {
    client.end();
    res.status(200);
    res.end();
  });
});

module.exports = router;