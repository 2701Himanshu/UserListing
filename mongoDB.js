var MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb+srv://admin:admin@cluster0-cqjwl.mongodb.net/test?retryWrites=true';
const url = "mongodb+srv://admin:admin@cluster0-cqjwl.mongodb.net/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
const dbName = 'SattaDB';
var _db = {};
// replicaSet=Cluster0-shard-0

// const client = new MongoClient(uri, { useNewUrlParser: true });


module.exports = {
	connectToServer: function( callback ) {
		MongoClient.connect(url , { useNewUrlParser: true, authSource:'admin', replicaSet: 'Cluster0-shard-0' }, function(err, db){
			console.log(err);
	      _db = db.db(dbName);
	      return callback( err );
	    });
	},
	getDb: function(){
		return _db;
	}
};
