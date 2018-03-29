var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');
var async = require('async');
//
///* GET home page. */
router.get('/', function(req, res, next) {
	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "系统首页"
	}

	var queryObj = {};
	var showObj = {};
	mysql.connect((db) => {

		//		var option = {
		//			function(db, cb) {
		//				
		//				mysql.find(db, "user", {}, {_id: 0}, function(result1) {
		//					var len1 = result1.length
		//					cb(null, len1);
		//				})
		//				})
		//			},
		//			function(db,cb) {
		//				mysql.connect((db) => {
		//				mysql.find(db, "banner", {}, {_id: 0}, function(result2) {
		//					var len2 = result2.length
		//					cb(null, len2);
		//				})
		//				})
		//			},
		//			function(db,cb) {
		//				mysql.connect((db) => {
		//				mysql.find(db, "pic", {}, {_id: 0}, function(result3) {
		//					var len3 = result3.length
		//					cb(null, len3);
		//				})
		//				})
		//			},
		//			function(db,cb) {
		//				mysql.connect((db) => {
		//				mysql.find(db, "product", {}, {_id: 0}, function(result4) {
		//					var len4 = result4.length
		//					cb(null, len4);
		//				})
		//				})
		//			}
		//		}
		//
		//		async.parallel(option, (err, result) => {
		//  				if(err) throw err;
		//  				console.log(result);
		//  				db.close()
		//  		//所有的请求都已完成
		//		})

		mysql.find(db, "user", queryObj, showObj, (result1) => {
			mysql.find(db, "banner", queryObj, showObj, (result2) => {
				mysql.find(db, "pic", queryObj, showObj, (result3) => {
					mysql.find(db, "product", queryObj, showObj, (result4) => {

						var dataobj = {
							usercount: result1.length,
							bannercount: result2.length,
							piccount: result3.length,
							productcount: result4.length,

							userInfo: [userInfo]
						}
						console.log(dataobj)
						res.render('webmsg', dataobj);
						db.close();
					})
				})
			})
		})

	})

});

module.exports = router;