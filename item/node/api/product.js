var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');
var async = require('async');
var md5 = require('md5')

var SendCode = require("./sendCode.js") //引入验证码模块

//


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








//============================产品信息=================================
router.get('/homeaa', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "home", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

router.get('/new', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "new", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

router.get('/sell', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "sell", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

router.get('/kind', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "kind", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

router.get('/detail', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "detail", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});
//订单
router.get('/order', function(req, res, next) {
	var queryObj = {
		paystate: "2"
	};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "cart", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});
//======获取验证码======
router.get('/code', function(req, res, next) {

	console.log(req.query);
	var obj = req.query;

	SendCode.aliyun(obj.phone, "陈中孝", "SMS_123665504", obj.code, (data) => {
		console.log(data)
		res.send("1") //必需要为字符串1
	})

});
//=====注册=====
router.get('/register', function(req, res, next) {
	var obj = req.query;

	mysql.connect((db) => {
		mysql.find(db, "buyuser", {
			phone: obj.phone
		}, {
			_id: 0
		}, (data1) => {

			if(data1.length > 0) {
				res.send('0')
				db.close();

			} else {

				var inserData = {
					phone: obj.phone,
					password: md5(obj.password)

				}

				//无责插入
				mysql.insert(db, 'buyuser', inserData, (result) => {
					res.send('1')
					db.close();

				})

			}

		})
	})

});

//====登录======
//=====注册=====
router.get('/buyuser', function(req, res, next) {
	var obj = req.query;

	mysql.connect((db) => {
		mysql.find(db, "buyuser", {
			phone: obj.phone,
			password: md5(obj.password)
		}, {
			_id: 0
		}, (data1) => {

			if(data1.length > 0) {
				res.send('1')
				db.close();

			} else {

				res.send('0')
				db.close();

			}

		})
	})

});

//直接购买商品
router.get('/directsalt', function(req, res, next) {
	var cartdata = req.query;
	console.log(req.query)
	mysql.connect((db) => {
		mysql.find(db, "detail", {}, {
			_id: 0
		}, (data1) => {

			for(var i = 0; i < data1.length; i++) {

				if(cartdata.pid == data1[i].result.itemInfo.iid) {
					var title = data1[i].result.itemInfo.title;
					var oldPrice = data1[i].result.itemInfo.oldPrice;
					var price = data1[i].result.itemInfo.price;
					var shopname = data1[i].result.shopInfo.name;

				}
			}
			var inserData = {
				id: cartdata.pid,
				color: cartdata.color,
				size: cartdata.size,
				num: Number(cartdata.num),
				img: cartdata.img,
				title: title,
				oldPrice: oldPrice,
				price: price,
				shopname: shopname,
				timestamp: cartdata.timestamp,
				paystate: cartdata.paystate
			}

			//无责插入
			mysql.insert(db, 'cart', inserData, (result) => {
				res.send('1')
				db.close();

			})

		})
	})

});

//获取订单信息
//router.get('/order', function(req, res, next) {
//	var queryObj = {
////		paystate: "2"
//	};
//	var showObj = {
//		_id: 0
//	}
//	mysql.connect((db) => {
//		mysql.find(db, "cart", queryObj, showObj, (data) => {
//			res.send(data)
//
//			db.close();
//		})
//	})
//});

//获取购物车信息
router.get('/cart', function(req, res, next) {
	var queryObj = {
		//		paystate: "1"
	};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "cart", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

//单件删除产品
router.get('/signledel', function(req, res, next) {
	console.log(req.query.timestamp)
	var deleteObj = {
		timestamp: req.query.timestamp
	}

	mysql.connect((db) => {

		mysql.deleteOne(db, "cart", deleteObj, (result) => {

			res.send('1');
			db.close();

		})
	})

});
//批量删除产品
router.get('/somedel', function(req, res, next) {
	console.log(req.query.someneeddel)

	var someneeddel = req.query.someneeddel

	mysql.connect((db) => {

		var deleteObj = {};
		for(var i = 0; i < someneeddel.length; i++) {
			deleteObj = {
				timestamp: someneeddel[i]
			}

			mysql.deleteOne(db, "cart", deleteObj, (result) => {

				res.send('1');
				db.close();

			})
		}

	})

	//	var deleteObj={
	//		timestamp:req.query.timestamp
	//	}
	//	
	//	mysql.connect((db) => {
	//		
	//		mysql.deleteOne(db, "cart", deleteObj, (result) => {
	//
	//				res.send('1');
	//				db.close();
	//
	//			})
	//	})

});

//更新购物车产品数量
router.get('/updatedetail', function(req, res, next) {
	console.log('gengxin cart')
	var cartdata = req.query;
	console.log(cartdata, "cartdata")

	var queryObj = {
		id: cartdata.pid,
		color: cartdata.color,
		size: cartdata.size,
	};
	var showObj = {
		_id: 0
	}

	var whereObj = queryObj;

	mysql.connect((db) => {

		mysql.find(db, "detail", {}, {
			_id: 0
		}, (data1) => {

			for(var i = 0; i < data1.length; i++) {
				if(cartdata.pid == data1[i].result.itemInfo.iid) {
					var title = data1[i].result.itemInfo.title;
					var oldPrice = data1[i].result.itemInfo.oldPrice;
					var price = data1[i].result.itemInfo.price;
					var shopname = data1[i].result.shopInfo.name;

				}
			}
			var inserData = {
				id: cartdata.pid,
				color: cartdata.color,
				size: cartdata.size,
				num: Number(cartdata.num),
				img: cartdata.img,
				title: title,
				oldPrice: oldPrice,
				price: price,
				shopname: shopname,
				timestamp: cartdata.timestamp,
				paystate: cartdata.paystate
			}

			mysql.find(db, "cart", queryObj, showObj, (data) => {

				if(data.length > 0) {
					//有责更新
					var initnum = data[0].num;
					var allnum = Number(initnum) + Number(cartdata.num);
					var updateObj = {
						id: cartdata.pid,
						color: cartdata.color,
						size: cartdata.size,
						num: allnum,
						img: cartdata.img,
						title: title,
						oldPrice: oldPrice,
						price: price,
						shopname: shopname,
						timestamp: cartdata.timestamp,
						paystate: cartdata.paystate
					}
					mysql.updateOne(db, "cart", whereObj, updateObj, (result1) => {

						res.send('1');
						db.close();
					})

				} else {
					//无责插入
					mysql.insert(db, 'cart', inserData, (result) => {
						res.send('1')
						db.close();

					})

				}

			})

		})

	})

});

//获取购物车产品数量
router.get('/cartnum', function(req, res, next) {

	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "cart", queryObj, showObj, (data) => {
			//			console.log(data.length,'data.length');
			var numboj = {
				num: data.length
			}
			res.send(numboj);
			db.close();
		})
	})
});

module.exports = router;