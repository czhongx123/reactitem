var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');
var md5=require('md5');

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.render('index', { title: 'Express' });
	req.session.destroy(() => { //销毁session
		res.render('login', {})
	})

	//	res.render('login');
});

router.post('/', function(req, res, next) {
	var obj = req.body;
	mysql.connect((db) => {
		var queryObj = {
			username: obj.username
		};
		var showObj = {};
		mysql.find(db, "user", queryObj, showObj, (result) => {

			if(result.length) {
					obj.password=md5(obj.password);
				if(result[0].password == obj.password) {

					if(result[0].status == "1") {
						//密码匹配
						req.session.name = result[0].username;
						req.session.key = result[0].key;
						
						console.log("登录成功")
						res.send('1');
						db.close();

					} else {
						res.send('3');
						db.close();
					}

				} else {
					//密码错误
					console.log('密码错误')
					res.send('2');
					db.close();
				}

			} else {
				//用户名不存在
				console.log('该用户不存在')
				res.send('0');
				db.close();
			}
		})

	})

})

module.exports = router;