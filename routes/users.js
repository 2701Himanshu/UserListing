var express = require('express');
var mongoDB = require('../mongoDB');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. 
 * db.tuts.find()
 */
router.get('/', function(req, res, next) {
	var DB = mongoDB.getDb();
	DB.collection('Date').find().toArray(function(err, result){
	  	if(err) res.send(err);
	  	else res.send(result);
	});
});

// name, age, email, password, phone, gender, country
// insert single user
router.post('/insertUser', function(req, res){
	var DB = mongoDB.getDb();
	var dataToQuery = {
		"email": req.body.email
	};
	DB.collection('users').find(dataToQuery).toArray(function(err, result){
	  	if(err) res.send(err);
	  	else {
	  		if(result.length != 0) {
	  			res.json({status:'102', msg:"User already exist."});
	  		} else {
	  			DB.collection('users').insert(req.body, function(err, result){
				  	if(err) res.json(err);
				  	else res.json(result);
				});
	  		}
	  	}
	});
});

// get single user detail
router.post('/getUserDetail', function(req, res){
	var dataToQuery = {
		"_id": ObjectId(req.body.id)
	};
	var DB = mongoDB.getDb();
	DB.collection('users').find(dataToQuery).toArray(function(err, result){
	  	if(err) res.send(err);
	  	else res.send(result);
	});
});

router.post('/removeAUser', function(req, res){
	var dataToQuery = {
		"_id": ObjectId(req.body.id)
	};
	var DB = mongoDB.getDb();
	DB.collection('users').deleteOne(dataToQuery, function(err, result){
		if(err) res.send(err);
	  	else res.send(result);
	});
});

// db.users.updateOne({"email": "ashi@gmail.com"} , { $set: {"name": "Ashi", "age":23 } } );
router.post('/updateUser', function(req, res){
	// res.send(req.body);
	var matchCriteria = {
		"_id": ObjectId(req.body._id)
	};
	delete req.body._id;
	var DB = mongoDB.getDb();
	DB.collection('users').updateOne(matchCriteria, { $set: req.body }, function(err, result){
		if(err) res.send(err);
		else res.send(result);
	});
});

module.exports = router;
