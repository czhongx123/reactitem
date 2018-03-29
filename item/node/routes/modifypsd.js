var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');
var md5 = require("md5");

//
///* GET home page. */
router.get('/', function(req, res, next) {
	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "修改密码"
	}
	var dataobj = {

		userInfo: [userInfo]
	}
	res.render('modifypsd', dataobj);
	//	res.render('');
});

router.post('/resetpsd', function(req, res, next) {
	//mpass newpass renewpass
	var loginname = req.session.name;

	var reg = /^[A-Za-z0-9]{6,16}$/;
	var obj = req.body;
	if(obj.newpass.match(reg)) {
		mysql.connect((db) => {
			var queryObj = {
				username: loginname,
				password: md5(obj.mpass)
			};
			var whereObj = {
				username: loginname
			};
			var showObj = {};

			mysql.find(db, "user", queryObj, showObj, (data) => {
				console.log(data)

				if(data.length == "1") {

					var updateObj = {
						username: loginname,
						password: md5(obj.newpass),
						id: data[0].id,
						classid: data[0].classid,
						position: data[0].position,
						name: data[0].name,
						sexy: data[0].sexy,
						key: data[0].key,
						status: data[0].status

					};
					mysql.updateOne(db, "user", whereObj, updateObj, (result) => {

						res.send('<script>alert("密码修改成功");location.href="/modifypsd";</script>');
						db.close();

					})

				} else {
					res.send('<script>alert("请输入正确的密码")</script>')

					db.close();
				}

			})
		})
	} else {
		res.send('<script>alert("新密码为8到16位数字与字母组合")</script>')
	}

	console.log(obj);

})

module.exports = router;