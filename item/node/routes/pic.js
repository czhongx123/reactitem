var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');

var multer = require('multer');
var upload = multer({
	dest: "uploads/"
});
var fs = require('fs');

//
///* GET home page. */
router.get('/', function(req, res, next) {
	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "图片管理"
	}
	var dataobj = {

		userInfo: [userInfo]
	}
	res.render('pic', dataobj);
	//	res.render('');
});

router.post('/add', upload.single('simg'), function(req, res, next) {
	console.log('234567')
	var obj = req.body; //表单数据
	console.log(req.file) //文件信息

	var type = req.file.mimetype.split('/')[1];
	var bannerSrc = "http://localhost:3000/" + req.file.filename + "." + type;

	mysql.connect(function(db) {

		var insertData = {
			id: obj.sid,
			title: obj.stitle,
			imgSrc: bannerSrc,
			linkSrc: obj.surl
		}

		fs.rename("uploads/" + req.file.filename, "uploads/" + req.file.filename + "." + type, function(err, data) {
			if(err) {
				console.log(err)
			} else {
				var queryObj = {
					id: obj.sid
				};

				mysql.find(db, "pic", queryObj, {}, (data) => {
					if(data.length > 0) {
						res.send("<script>alert('ID名重复，请更换ID后重新上传');location.href='/pic'</script>")
					} else {
						mysql.insert(db, 'pic', insertData, function(result) {
							console.log(result)

							res.send("<script>alert('操作成功');location.href='/pic'</script>")
							//重定向
							//res.redirect("/pic");
							db.close();
						})

					}
				})
			}

		})

	})
})
module.exports = router;