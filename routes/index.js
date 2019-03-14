var express = require('express');
var router = express.Router();

var mongoDB = require('../mongoDB');
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('Hello');
});

function middleware (req, res, next) {
	return next();
}

router.post('/submitDate', middleware, function(req, res, next) {
  	var DB = mongoDB.getDb();
	var dataToQuery = {
		"date": req.body.date,
		"numEntry": req.body.numEntry
	};

	DB.collection('NumEntry').find().toArray(function(err, result){
		if(err) res.send(err);
		DB.collection('NumEntry').insert(dataToQuery, function(err, result){
		  	if(err) res.json(err);
		  	res.json(result);
		});
	});
});

router.get('/getData', function(req, res, next){
	var DB = mongoDB.getDb();
	DB.collection('NumEntry').find().sort({ _id: -1 }).toArray(function(err, result){
		if(err) res.send(err);
		res.json(result);
	});
});

router.post('/getCurrentDayNumbers', function(req, res, next){
	var DB = mongoDB.getDb();
	var dataToQuery = {
		"_id": ObjectId(req.body.id)
	};
	DB.collection('NumEntry').find(dataToQuery).toArray(function(err, result){
		if(err) res.send(err);
		res.json(result);
	});
});

router.post('/removeEntry', function(req, res, next){
	var DB = mongoDB.getDb();
	var dataToQuery = {
		"_id": ObjectId(req.body.id)
	};
	DB.collection('NumEntry').remove(dataToQuery, function(err, result){
		if(err) res.send(err);
		res.json(result);
	});
});

router.post('/updateEntry', function(req, res, next){
	var DB = mongoDB.getDb();
	var dataToQuery = {
		"_id": ObjectId(req.body._id)
	};
	DB.collection('NumEntry').update(dataToQuery, {$set:{'numEntry':req.body.numEntry}}, function(err, result){
		if(err) res.send(err);
		res.json(result);
	});
});

router.post('/login', function(req, res, next){
	var DB = mongoDB.getDb();
	DB.collection('Users').find(req.body).toArray(function(err, result){
		if(err) res.send(err);
		res.json(result[0]._id);
	});
});

module.exports = router;
