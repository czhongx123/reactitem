window.onload = function() {
	/*获取导航对象*/
		console.log(22423456)
	
	var wrap = document.getElementById("wrap");
	ceiling(wrap) /*调用吸顶函数  */
};

function ceiling(obj) {
	var ot = obj.offsetTop;
	
	document.onscroll = function() {
		var st = document.body.scrollTop || document.documentElement.scrollTop;
		console.log(23456)
		/*
		 * 在这里我给obj添加一个自定义属性。className可能会影响原有的class
		 * 三元运算使代码更简洁
		 */
		obj.setAttribute("data-fixed", st >= ot ? "fixed" : "");
	}
}