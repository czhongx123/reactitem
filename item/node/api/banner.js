var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');

//
///* GET home page. */

router.get('/', function(req, res, next) {

	mysql.connect((db) => {
		var queryObj = {};
		var showObj = {};
		var sortObj = {
			sortID: 1
		};
		mysql.findSort(db, "banner", queryObj, showObj, sortObj, (result) => {

			//			console.log(result)
			var userInfo = {
				loginname: req.session.name,
				loginkey: req.session.key,
				title: "轮播图管理"
			}

			var dataobj = {
				result: result,
				userInfo: [userInfo]
			}
			
			res.send(dataobj)

//			res.render('banner', dataobj);
			db.close();

		})
	})

});

//删除轮播图
router.post('/deluser', function(req, res, next) {
	var obj = req.body;

	mysql.connect((db) => {
		var deleteObj = {
			id: obj.id
		}
		var arr = [];
		mysql.deleteOne(db, "banner", deleteObj, (result) => {
			var queryObj = {};
			var showObj = {};
			mysql.find(db, "banner", queryObj, showObj, (result1) => {

				for(var i = 0; i < result1.length; i++) {
					if(Number(result1[i].sortID) > Number(obj.sortID)) {
						arr.push(result1[i]);

					}
				}

				console.log(arr);
				if(arr.length > 0) {
					for(var j = 0; j < arr.length; j++) {
						var whereObj = {
							id: arr[j].id
						};
						arr[j].sortID = Number(arr[j].sortID - 1);
						var updateObj = arr[j]
						mysql.updateOne(db, "banner", whereObj, updateObj, (data) => {

						})
					}

					res.send("1");
					db.close();
				} else {

					res.send("1");
					db.close();

				}

			})

		})

	})

});

//添加轮播图
router.post('/addbanner', function(req, res, next) {
	var obj = req.body;
	//	console.log(obj)

	var queryObj = {
		id: obj.id
	};
	var queryObj1 = {};
	var showObj = {};
	mysql.connect((db) => {
		mysql.find(db, "banner", queryObj, showObj, (result) => {
			if(result.length > 0) {
				res.send("<script>location.href='/banner';alert('您添加的图片已存在，请更换ID')</script>");
				db.close();
			} else {

				mysql.find(db, "banner", queryObj1, showObj, (result1) => {

					var inserData = {
						id: obj.id,
						img: obj.url,
						link: obj.link,
						sortID: Number(result1.length + 1)
					}

					mysql.insert(db, "banner", inserData, (data) => {
						res.send("<script>location.href='/banner'</script>");
						db.close();

					})

				})
			}

		})

	})

});

//上移轮播图
router.post('/upsortID', function(req, res, next) {
	var obj = req.body;
	console.log(obj);
	mysql.connect((db) => {

		var queryObj1 = {
			id: obj.curID
		}; //当前的
		var queryObj2 = {
			id: obj.preID
		}; //上一个
		var showObj1 = {};
		var showObj2 = {};

		mysql.find(db, "banner", queryObj1, showObj1, (data1) => {

			var whereObj1 = queryObj1;
			var whereObj2 = queryObj2;
			mysql.find(db, "banner", queryObj2, showObj2, (data2) => {

				var updateObj1 = {
					sortID: Number(data2[0].sortID),
					id: data1[0].id,
					img: data1[0].img,
					link: data1[0].link
				};
				var updateObj2 = {
					sortID: Number(data1[0].sortID),
					id: data2[0].id,
					img: data2[0].img,
					link: data2[0].link
				};

				//更新当前的
				mysql.updateOne(db, "banner", whereObj1, updateObj1, (result1) => {
					mysql.updateOne(db, "banner", whereObj2, updateObj2, (result2) => {
						var queryObj = {};
						var showObj = {};
						var sortObj = {
							sortID: 1
						};
						mysql.findSort(db, "banner", queryObj, showObj, sortObj, (result) => {

							console.log("上移成功");

							res.send('1')
							db.close();

						})

					})
				})

			})
		})

	})

});

//修改轮播图

router.post('/modifyAction', function(req, res, next) {

	var obj = req.body;

	var queryObj = {
		id: obj.id
	};
	console.log(queryObj)
	var showObj = {};
	mysql.connect((db) => {
		mysql.find(db, "banner", queryObj, showObj, (result) => {

			res.send(result);
			db.close();

		})
	})

});
//确认修改轮播图
router.post('/modify', function(req, res, next) {

	var obj = req.body;

	var queryObj = {
		id: obj.id
	};
	var whereObj = {
		id: obj.id
	};
//	console.log(queryObj)
	var showObj = {};
	mysql.connect((db) => {
		
		mysql.find(db,"banner",queryObj,showObj,(data)=>{
//			console.log(data)
			var updateObj={
				id:obj.id,
				img:obj.url,
				link:obj.link,
				sortID:data[0].sortID
				
			}
			console.log(updateObj);
			
			mysql.updateOne(db, "banner", whereObj, updateObj, (result) => {

				res.send("<script>location.href='/banner'</script>");
				db.close();

			})
			
		})
		
	})

});




module.exports = router;