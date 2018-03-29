var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');
var md5 = require('md5');

//
///* GET home page. */

//管理员列表
router.get('/', function(req, res, next) {

	mysql.connect((db) => {
		var queryObj = {};
		var showObj = {};
		mysql.find(db, "user", queryObj, showObj, (result) => {

			var userInfo = {
				loginname: req.session.name,
				loginkey: req.session.key,
				title: "管理员列表"
			}

			var dataobj = {
				result: result,
				userInfo: [userInfo]
			}

			res.render('manager', dataobj);
			db.close();

		})
	})

});

//添加管理员页面
router.get('/adduser', function(req, res, next) {
	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "添加管理员"
	}

	var dataobj = {

		userInfo: [userInfo]
	}

	res.render('adduser', dataobj);
	db.close();
});
//添加管理员
router.post('/adduserAction', function(req, res, next) {
	console.log(req.body)
	mysql.connect((db) => {
		var insertData = req.body;
		var queryObj = {
			user: insertData.username
		};
		var queryObj1 = {
			id: insertData.id
		};
		insertData.password = md5(insertData.password);
		var showObj = {};

		mysql.find(db, "user", queryObj, showObj, (data) => {

			if(data.length) {
				//该用户已存在(用户名重名)
				res.send("0");
				db.close();
			} else {
				mysql.find(db, "user", queryObj1, showObj, (data1) => {
					if(data1.length) {
						//该用户已存在(工号已存在)
						res.send("2");
						db.close();

					} else {

						mysql.insert(db, "user", insertData, (result) => {
							//可以添加
							res.send("1")
							db.close();
						})

					}

				})

			}
		})

	})

});





//更改管理员状态
router.post('/changeState', function(req, res, next) {
	var obj = req.body;
	mysql.connect((db) => {
		var whereObj = {
			id: obj.id
		};
		var updateObj = {
			status: obj.status
		};
		var queryObj = whereObj;
		var showObj = {};
		mysql.find(db, "user", queryObj, showObj, (data) => {
			data[0].status = updateObj.status;

			mysql.updateOne(db, "user", whereObj, data[0], (result) => {
				console.log("更新成功");
				res.send('1')
				db.close();
			})

		})

	})

});

//修改管理员信息
router.get('/modifyuser', function(req, res, next) {

	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "修改管理员信息"
	}
	var obj = req.query;

	var queryObj = {
		id: obj.id
	};
	var showObj = {};
	mysql.connect((db) => {
		mysql.find(db, "user", queryObj, showObj, (result) => {

			var dataobj = {
				result: result,
				userInfo: [userInfo]
			}
			
			res.render('modifyuser', dataobj);
			db.close();

		})
	})

});

//确认更新管理员信息
router.post('/modifyuserAction', function(req, res, next) {
	console.log(req.body)
	mysql.connect((db) => {
		var updateData = req.body;
		var queryObj = {
			id: updateData.id
		};
		var showObj = {
			password: 1,
			status: 1
		};

		mysql.find(db, "user", queryObj, showObj, (data) => {

			var whereObj = queryObj;
			var updateObj = updateData;
			updateObj.password = data[0].password;
			updateObj.status = data[0].status;
			mysql.updateOne(db, "user", whereObj, updateObj, (result) => {

				res.send('1');
				db.close();
			})

		})

	})

});

//删除管理员
router.post('/deluser', function(req, res, next) {
	var obj = req.body;

	mysql.connect((db) => {
		var deleteObj = {
			id: obj.id
		}

		mysql.deleteOne(db, "user", deleteObj, (result) => {

			res.send("1");
			db.close();

		})

	})

});

module.exports = router;