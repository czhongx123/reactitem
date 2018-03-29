//获取当前时间
function logintime() {
	var date = new Date();

	var logintime = date.toLocaleString()

	$('#date').html(logintime);

	localStorage.setItem("logintime", logintime)

}
logintime()