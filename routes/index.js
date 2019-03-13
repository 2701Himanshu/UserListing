var express = require('express');
var router = express.Router();

var mongoDB = require('../mongoDB');
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('Hello');
});

router.post('/submitDate', function(req, res, next) {
  	var DB = mongoDB.getDb();
	var dataToQuery = {
		"date": req.body.date,
		"numEntry": req.body.numEntry
	};
	// res.json(dataToQuery);
	DB.collection('NumEntry').find().toArray(function(err, result){
		if(err) res.send(err);
		res.json(result);
	})
	// DB.collection('users').find(dataToQuery).toArray(function(err, result){
	//   	if(err) res.send(err);
	//   	else {
	//   		if(result.length != 0) {
	//   			res.json({status:'102', msg:"User already exist."});
	//   		} else {
	//   			DB.collection('users').insert(req.body, function(err, result){
	// 			  	if(err) res.json(err);
	// 			  	else res.json(result);
	// 			});
	//   		}
	//   	}
	// });

	// DB.collection('NumEntry').find(dataToQuery).toArray(function(err, result){
	//   	if(err) res.send(err);
	//   	else {
	//   		if(result.length != 0) {
	//   			res.json({status:'102', msg:"User already exist."});
	//   		} else {
	//   			DB.collection('users').insert(req.body, function(err, result){
	// 			  	if(err) res.json(err);
	// 			  	else res.json(result);
	// 			});
	//   		}
	//   	}
	// });

});

module.exports = router;
