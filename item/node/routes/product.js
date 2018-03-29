var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');
var async = require('async');

//
///* GET home page. */
router.get('/', function(req, res, next) {

	//当前页码数
	let pageNO = req.query.pageNO;
	pageNO = pageNO ? pageNO : 1;

	//			console.log(req.query.sale == undefined);
//	console.log(req.query.sort);
	//			console.log(sortObj);
	if(req.query.sort == "-1") {
//		console.log('121')
		var sale = -1;
	} else if(req.query.sort == "1") {
//		console.log('11')
		var sale = 1;

	} else {
		var sale = 0;
	}
//	console.log(sale);

	//总页数
	let page = 0;
	//每页显示的数据量
	let pageSize = 3;
	var limitNum = pageSize;
	//总条数
	let count = 0;
	var queryObj = {};
	var showObj = {};

	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "产品列表"
	}

	mysql.connect((db) => {
		async.series([
			(callback) => {

				mysql.find(db, "product", queryObj, showObj, (data) => {
					count = data.length;
					page = Math.ceil(count / pageSize);
					pageNO = pageNO < 1 ? 1 : pageNO;
					pageNO = pageNO > page ? page : pageNO;

					callback(null, "") //null代表没有错误

				})
			},
			(callback) => {
				var skipNum = (pageNO - 1) * pageSize;
				var pageCode = pageNO;
				var sortObj = {
					sale: sale * 1
				};
//				console.log('1234567');
//				console.log(sortObj);
//				console.log(skipNum);

				if(sale == "0") {
					mysql.findFenye1(db, "product", queryObj, showObj, pageSize, skipNum, pageNO, (data) => {
						callback(null, data);
					})
				} else {
					mysql.findFenyeSort(db, 'product', queryObj, showObj, limitNum, skipNum, pageCode, sortObj, (data) => {
//						console.log(data);
						callback(null, data);
					})
				}

			}
		], (err, result) => {
			//			console.log(result);

			var dataobj = {
				result: result[1],
				pageNO: pageNO,
				page: page,
				sort: sale,
				count: count,
				pageSize: pageSize,
				userInfo: [userInfo]
			}
			res.render('product', dataobj);

			db.close();
		})

	})

});

//批量删除

router.post('/delsign', function(req, res, next) {

	let arr = req.body.id.split(',');

	mysql.connect((db) => {

		var deleteObj = {};
		for(var i = 0; i < arr.length; i++) {
			deleteObj = {
				shopId: arr[i]
			}

			mysql.deleteOne(db, "product", deleteObj, (result) => {

				res.send('1');
				db.close();

			})
		}

	})

})

//产品搜索
router.post('/search', function(req, res, next) {

	let obj = req.body;

	console.log(obj)

	var userInfo = {
		loginname: req.session.name,
		loginid: req.session.key,
		title: "产品列表"
	}

	mysql.connect((db) => {
		var queryObj = {
			$or: [

				{
					title: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					shopId: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					props: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					orgPrice: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					price: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					sale: {
						$regex: obj.con,
						$options: "i"
					}
				}

			]
		};
		var showObj = {};
		//		console.log(queryObj)
		mysql.find(db, "product", queryObj, showObj, (result) => {

			console.log(result);

			var dataobj = {
				result: result,
				userInfo: [userInfo]
			}

			res.send(dataobj)

			db.close();

		})

	})

})

//			//排序
//			router.get('/sort', function(req, res, next) {
//				var pageNO = req.query.pageNO;
//				var sale = req.query.sale;
//				var userInfo = {
//					loginname: req.session.name,
//					loginid: req.session.key,
//					title: "产品列表"
//				}
//
//				mysql.connect((db) => {
//					var queryObj = {};
//					var showObj = {
//						_id: 0,
//						shopId: 1,
//						props: 1,
//						title: 1,
//						img: 1,
//						link: 1,
//						orgPrice: 1,
//						price: 1,
//						sale: 1
//					};
//
//					mysql.find(db, 'product', queryObj, showObj, (resultAll) => { //查询所有
//						var pageSize = 3;
//						var skipNum = (pageNO-1) * pageSize;
//						var sortObj = {
//							sale: sale * 1
//						};
//						var count = resultAll.length;
//						var page = Math.ceil(count / pageSize);
//						console.log(sortObj);
//						var limitNum = pageSize;
//						var pageCode = pageNO;
//
//						mysql.findFenyeSort(db, 'product', queryObj, showObj, limitNum, skipNum, pageCode, sortObj, (result) => {
//							//					console.log(result);
//							var dataobj = {
//								result: result,
//								pageNO: pageNO,
//								page: page,
//								count: count,
//								sort: sale,
//								pageSize: pageSize,
//								userInfo: [userInfo]
//							}
//							//				console.log(dataobj)
//							res.render('product', dataobj);
//
//							db.close();
//
//						})
//
//					})
//
//				})
//
//			});

//添加产品页面
router.get('/add', function(req, res, next) {
	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "产品管理"
	}
	var dataobj = {

		userInfo: [userInfo]
	}
	res.render('addproduct', dataobj);

});

//确认添加产品
router.post('/addproductAction', function(req, res, next) {

	console.log(req.body)
	mysql.connect((db) => {
		var insertData = req.body;
		var queryObj = {
			shopId: insertData.shopId
		};
		insertData.sale = Number(insertData.sale);
		var showObj = {};

		mysql.find(db, "product", queryObj, showObj, (data) => {

			if(data.length) {
				//该产品已存在
				res.send("0");
				db.close();
			} else {

				mysql.insert(db, "product", insertData, (result) => {
					//可以添加
					res.send("1")
					db.close();
				})

			}
		})

	})
})

//修改产品信息
router.get('/modifyproduct', function(req, res, next) {

	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "修改产品信息"
	}
	var obj = req.query;

	var queryObj = {
		shopId: obj.shopId
	};
	console.log(queryObj)
	var showObj = {};
	mysql.connect((db) => {
		mysql.find(db, "product", queryObj, showObj, (result) => {

			var dataobj = {
				result: result,
				userInfo: [userInfo]
			}
			console.log(dataobj)
			res.render('productrefresh', dataobj);

			//			res.render('tips', dataobj);
			db.close();

		})
	})

});
//确认更新产品信息
router.post('/modifyproductAction', function(req, res, next) {
	console.log(req.body)
	mysql.connect((db) => {
		var updateObj = req.body;
		updateObj.sale = Number(updateObj.sale);
		var whereObj = {
			shopId: updateObj.shopId
		};

		mysql.updateOne(db, "product", whereObj, updateObj, (result) => {

			res.send('1');
			db.close();
		})

	})

});
//删除产品信息
router.post('/delproduct', function(req, res, next) {
	var obj = req.body;

	mysql.connect((db) => {
		var deleteObj = {
			shopId: obj.shopId
		}

		mysql.deleteOne(db, "product", deleteObj, (result) => {

			res.send("1");
			db.close();

		})

	})

});

module.exports = router;