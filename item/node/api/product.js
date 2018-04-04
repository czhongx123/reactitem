var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');
var async = require('async');
var md5 = require('md5')

var SendCode = require("./sendCode.js") //引入验证码模块

//引入排序模块
var sortarr = require("./sortarr.js") //引入排序模块




//==================搜索结果====================
router.get('/searchresult', function(req, res, next) {
	
	console.log(req.body,'aaaaaaaaaa');
	console.log(req.query,'bbbbbbbbbbbb')
//	var obj=req.query;
	
	var obj={con:'葡萄'}
	
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "kindlist", queryObj, showObj, (data) => {
			var arr1=[];
			var arr=[];
			for(var i=0;i<data.length;i++){
				arr1.push(data[i].items.length)
			}
			var maxlength=Math.max(...arr1);//获取最大的数组长度
			console.log(maxlength)
			for(var j=0;j<data.length;j++){
				for(var k=0;k<maxlength;k++){
					
					if(data[j].items[k]!=undefined){
						
					
						if(data[j].items[k].name.indexOf(obj.con)!= -1){
							arr.push(data[j].items[k])
						}
					
					}
				}
			}
			
			res.send(arr)

			db.close();
		})
	})
	
	
	
});






//============================产品信息=================================

//首页
router.get('/home', function(req, res, next) {
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
//首页列表
router.get('/homelist', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "homelist", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});
//分类列表
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

//============================测试------

router.get('/test', function(req, res, next) {
	
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "kindlist", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});



//显示购物车数量
router.get('/cartnum', function(req, res, next) {
	
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "cart", queryObj, showObj, (data) => {
			
			var num=0;
			
			for(var i=0;i<data.length;i++){
				num+=data[i].num*1
			}
					
			var numboj = {
				num: num
			}
			res.send(numboj)

			db.close();
		})
	})
});




//添加入到购物车
router.get('/addcart', function(req, res, next) {
	
	console.log(req.query)
	var obj=req.query
	
	
	var queryObj = {
		id:obj.id
	};
	var showObj = {
		_id: 0
	}
	var whereObj={
		id:obj.id
	}
	
	mysql.connect((db) => {
		
		mysql.find(db, "cart", queryObj, showObj, (data) => {
			if(data.length>0){
				
			var updateObj=obj;
			
				updateObj.num=Number(updateObj.num)+Number(data[0].num)
				
			mysql.updateOne(db, "cart", whereObj, updateObj, (result1) 			=> {
						res.send('1');
						db.close();
			})
				
				
				
			}else{
				
			var inserData=obj	
				mysql.insert(db, 'cart', inserData, (result) => {
					res.send('1')
					db.close();

				})
				
			}
			
			
		})
		
		
		

		
		
	})
});


//获取购物车信息
router.get('/cart', function(req, res, next) {
	var queryObj = {
		
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


//删除商品

router.get('/del', function(req, res, next) {
	console.log(req.query)

	var arr=[];
	for(i in req.query){
		
		arr.push(i)
	}
	arr.pop(1)	
	
	console.log(arr)


//	var someneeddel = req.query.someneeddel

	mysql.connect((db) => {

		var deleteObj = {};
		for(var i = 0; i < arr.length; i++) {
			deleteObj = {
				id: arr[i]
			}

			mysql.deleteOne(db, "cart", deleteObj, (result) => {

				res.send('1');
				db.close();

			})
		}

	})


});










//分类列表二级//新品
router.get('/newproduct', function(req, res, next) {
	
//	var queryObj = {typeID:req.query.typeID};
	


	var queryObj = {typeId:"100100011"}
	
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "kindlist", queryObj, showObj, (data) => {
			var arr=[];
			for(var i=0;i<data.length;i++){
				arr=arr.concat(data[i].items) 
			}
			
			res.send(arr)

			db.close();
		})
	})
});


//分类列表二级//热卖
router.get('/hotproduct', function(req, res, next) {
	
//	var queryObj = {typeID:req.query.typeID};


	var queryObj = {typeId:"100100011"}
	
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "kindlist", queryObj, showObj, (data) => {
			var arr=[];
			for(var i=0;i<data.length;i++){
				arr=arr.concat(data[i].items) 
			}
	
	
//根据对象的key值排序	
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
var dataarr=arr.sort(compare('salesCount'))
	

			res.send(dataarr)

			db.close();
		})
	})
});

//分类列表二级//价格
router.get('/priceproduct', function(req, res, next) {
	
//	var queryObj = {typeID:req.query.typeID};
//	var sort=req.query.sort;
	var sort=-1
	var queryObj = {typeId:"100100011"}
	
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "kindlist", queryObj, showObj, (data) => {
			var arr=[];
			for(var i=0;i<data.length;i++){
				arr=arr.concat(data[i].items) 
			}
	
	
//根据对象的key值排序	

	if(sort==1){
		function compare(property,type){
		    return function(a,b){
		        var value1 = a[property][type];
		        var value2 = b[property][type];
		       
		        	
		       return value2-value1
		        
		    }
		}
	}else{
		function compare(property,type){
		    return function(a,b){
		        var value1 = a[property][type];
		        var value2 = b[property][type];
		       
		        	
		       return value1-value2
		        
		    }
		}
	}


var dataarr=arr.sort(compare('salesPrice',"value"))
	

			res.send(dataarr)

			db.close();
		})
	})
});




//详情
router.get('/detail', function(req, res, next) {
	var obj=req.query;	
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "detail", queryObj, showObj, (data) => {
			
			for(var i=0;i<data.length;i++){
				if(data[i].data.id== Number(obj.goodsId)){
					res.send(data[i])

					db.close();
				}
			}
			
			
		})
	})
});






//======获取验证码======
router.get('/getcode', function(req, res, next) {

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
		mysql.find(db, "user", {
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
				mysql.insert(db, 'user', inserData, (result) => {
					res.send('1')
					db.close();

				})

			}

		})
	})

});

//====登录======
router.get('/login', function(req, res, next) {
	var obj = req.query;

	
	mysql.connect((db) => {
		mysql.find(db, "user", {
			phone: obj.user,
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

//====重置密码=====
router.get('/resetpassword', function(req, res, next) {
	var obj = req.query;

	
	mysql.connect((db) => {
		mysql.find(db, "user", {
			phone: obj.phone
			
		}, {
			_id: 0
		}, (data1) => {

			if(data1.length==0) {
				res.send('0') //该手机号未注册
				db.close();

			} else{
				var whereObj={
					phone:obj.phone
				}
				var updateObj={
					phone:obj.phone,
					password:md5(obj.password)
				}
				
				mysql.updateOne(db, "user", whereObj, updateObj, (result1) => {

						res.send('1');
						db.close();
				})
			

			}

		})
	})

});









//======================================================

//直接购买商品
//router.get('/directsalt', function(req, res, next) {
//	var cartdata = req.query;
//	console.log(req.query)
//	mysql.connect((db) => {
//		mysql.find(db, "detail", {}, {
//			_id: 0
//		}, (data1) => {
//
//			for(var i = 0; i < data1.length; i++) {
//
//				if(cartdata.pid == data1[i].result.itemInfo.iid) {
//					var title = data1[i].result.itemInfo.title;
//					var oldPrice = data1[i].result.itemInfo.oldPrice;
//					var price = data1[i].result.itemInfo.price;
//					var shopname = data1[i].result.shopInfo.name;
//
//				}
//			}
//			var inserData = {
//				id: cartdata.pid,
//				color: cartdata.color,
//				size: cartdata.size,
//				num: Number(cartdata.num),
//				img: cartdata.img,
//				title: title,
//				oldPrice: oldPrice,
//				price: price,
//				shopname: shopname,
//				timestamp: cartdata.timestamp,
//				paystate: cartdata.paystate
//			}
//
//			//无责插入
//			mysql.insert(db, 'cart', inserData, (result) => {
//				res.send('1')
//				db.close();
//
//			})
//
//		})
//	})
//
//});





//单件删除产品
//router.get('/signledel', function(req, res, next) {
//	console.log(req.query.timestamp)
//	var deleteObj = {
//		timestamp: req.query.timestamp
//	}
//
//	mysql.connect((db) => {
//
//		mysql.deleteOne(db, "cart", deleteObj, (result) => {
//
//			res.send('1');
//			db.close();
//
//		})
//	})
//
//});
//批量删除产品
//router.get('/somedel', function(req, res, next) {
//	console.log(req.query.someneeddel)
//
//	var someneeddel = req.query.someneeddel
//
//	mysql.connect((db) => {
//
//		var deleteObj = {};
//		for(var i = 0; i < someneeddel.length; i++) {
//			deleteObj = {
//				timestamp: someneeddel[i]
//			}
//
//			mysql.deleteOne(db, "cart", deleteObj, (result) => {
//
//				res.send('1');
//				db.close();
//
//			})
//		}
//
//	})
//
//
//});

//更新购物车产品数量
//router.get('/updatedetail', function(req, res, next) {
//	console.log('gengxin cart')
//	var cartdata = req.query;
//	console.log(cartdata, "cartdata")
//
//	var queryObj = {
//		id: cartdata.pid,
//		color: cartdata.color,
//		size: cartdata.size,
//	};
//	var showObj = {
//		_id: 0
//	}
//
//	var whereObj = queryObj;
//
//	mysql.connect((db) => {
//
//		mysql.find(db, "detail", {}, {
//			_id: 0
//		}, (data1) => {
//
//			for(var i = 0; i < data1.length; i++) {
//				if(cartdata.pid == data1[i].result.itemInfo.iid) {
//					var title = data1[i].result.itemInfo.title;
//					var oldPrice = data1[i].result.itemInfo.oldPrice;
//					var price = data1[i].result.itemInfo.price;
//					var shopname = data1[i].result.shopInfo.name;
//
//				}
//			}
//			var inserData = {
//				id: cartdata.pid,
//				color: cartdata.color,
//				size: cartdata.size,
//				num: Number(cartdata.num),
//				img: cartdata.img,
//				title: title,
//				oldPrice: oldPrice,
//				price: price,
//				shopname: shopname,
//				timestamp: cartdata.timestamp,
//				paystate: cartdata.paystate
//			}
//
//			mysql.find(db, "cart", queryObj, showObj, (data) => {
//
//				if(data.length > 0) {
//					//有责更新
//					var initnum = data[0].num;
//					var allnum = Number(initnum) + Number(cartdata.num);
//					var updateObj = {
//						id: cartdata.pid,
//						color: cartdata.color,
//						size: cartdata.size,
//						num: allnum,
//						img: cartdata.img,
//						title: title,
//						oldPrice: oldPrice,
//						price: price,
//						shopname: shopname,
//						timestamp: cartdata.timestamp,
//						paystate: cartdata.paystate
//					}
//					mysql.updateOne(db, "cart", whereObj, updateObj, (result1) => {
//
//						res.send('1');
//						db.close();
//					})
//
//				} else {
//					//无责插入
//					mysql.insert(db, 'cart', inserData, (result) => {
//						res.send('1')
//						db.close();
//
//					})
//
//				}
//
//			})
//
//		})
//
//	})
//
//});
//

module.exports = router;