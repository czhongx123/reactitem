var MongoClient = require('mongodb').MongoClient;
var mongo_url = "mongodb://10.8.162.58:27017/squirrel";

var mysql = {
	connect(cb) {
		MongoClient.connect(mongo_url, (err, db) => {
			if(err) throw err;
			cb(db);
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	insert(db, collectionName, inserData, cb) {
		var collection = db.collection(collectionName)
		collection.insert(inserData, (err, result) => {
			if(err) throw err; //抛出异常，表示代码不继续往下执行
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	updateOne(db, collectionName, whereObj, updateObj, cb) {
		var collection = db.collection(collectionName)
		collection.updateOne(whereObj, updateObj, (err, result) => {
			if(err) throw err; //抛出异常，表示代码不继续往下执行
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	updateMany(db, collectionName, whereObj, updateObj, cb) {
		var collection = db.collection(collectionName)
		collection.updateMany(whereObj, updateObj, (err, result) => {
			if(err) throw err; //抛出异常，表示代码不继续往下执行
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	deleteOne(db, collectionName, deleteObj, cb) {
		var collection = db.collection(collectionName)
		collection.deleteOne(deleteObj, (err, result) => {
			if(err) throw err; //抛出异常，表示代码不继续往下执行
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	deleteMany(db, collectionName, deleteObj, cb) {
		var collection = db.collection(collectionName)
		collection.deleteMany(deleteObj, (err, result) => {
			if(err) throw err; //抛出异常，表示代码不继续往下执行
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	find(db, collectionName, queryObj, showObj, cb) {
		var collection = db.collection(collectionName)
		collection.find(queryObj, showObj).toArray((err, result) => {
			if(err) throw err;
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	findSort(db, collectionName, queryObj, showObj, sortObj, cb) {
		var collection = db.collection(collectionName)
		collection.find(queryObj, showObj).sort(sortObj).toArray((err, result) => {
			if(err) throw err;
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	findSkip(db, collectionName, queryObj, showObj, skipNum, cb) {
		var collection = db.collection(collectionName)
		collection.find(queryObj, showObj).skip(skipNum).toArray((err, result) => {
			if(err) throw err;
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	findFenye(db, collectionName, queryObj, showObj, limitNum, skipNum, pageCode, cb) {
		var collection = db.collection(collectionName)
		collection.find(queryObj, showObj).limit(limitNum).skip(skipNum).toArray((err, result) => {
			if(err) throw err;
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	//数据倒序渲染
	findFenye1(db, collectionName, queryObj, showObj, limitNum, skipNum, pageCode, cb) {
		var collection = db.collection(collectionName)
		collection.find(queryObj, showObj).sort({_id:-1}).limit(limitNum).skip(skipNum).toArray((err, result) => {
			if(err) throw err;
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	},
	findFenyeSort(db, collectionName, queryObj, showObj, limitNum, skipNum, pageCode, sortObj, cb) {
		var collection = db.collection(collectionName)
		//跟顺序无关
		collection.find(queryObj, showObj).limit(limitNum).skip(skipNum).sort(sortObj).toArray((err, result) => {
			if(err) throw err;
			cb(result)
			//此处不要关闭数据库，因为回调函数种可能有异步操作
		})
	}
	
	
	
	
}

module.exports = mysql;