var express = require('express');
var router = express.Router();
var mysql=require('./../public/javascripts/mysql');

//
///* GET home page. */
router.get('/', function(req, res, next) {

	var userInfo={
		loginname:req.session.name,
		loginkey:req.session.key,
		title:"网站信息"
	}
	var queryObj = {};
	var showObj = {};
	mysql.connect((db) => {

		mysql.find(db, "user", queryObj, showObj, (result1) => {
			mysql.find(db, "banner", queryObj, showObj, (result2) => {
				mysql.find(db, "pic", queryObj, showObj, (result3) => {
					mysql.find(db, "product", queryObj, showObj, (result4) => {

						var dataobj = {
							usercount:result1.length,
							bannercount:result2.length,
							piccount:result3.length,
							productcount:result4.length,

							userInfo: [userInfo]
						}
						console.log(dataobj)
						res.render('index', dataobj);

					})
				})
			})
		})

	})

//	res.render('');
});




router.get('/hometab', function(req, res, next) {





});

module.exports = router;
