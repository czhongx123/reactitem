var verifyCode = new GVerify("v_container");
document.getElementById("login").onclick = function() {
	setTimeout(function() {
		var input_help = $('.input-help').length;
		console.log(input_help);
		login(input_help);
	})

	function login(input_help) {
		var obj = {
			username: $('#txt').val(),
			password: $('#psd').val()
		}
		var res = verifyCode.validate($("#code_input").val());
		if(input_help == 0) {
			
			if(res) {

				$.ajax({
					type: "post",
					url: "/login",
					data: obj,
					success: function(data) {
						console.log(data);
						if(data == "0") {
							//用户名不存在
							alert('用户名错误')

						}
						if(data == "2") {
							//密码错误
							alert('密码错误')
						}
						if(data == "3") {
							alert('暂无权限')
						}
						if(data == "1") {
							//验证成功
							//跳转到首页
							location.href = "/"

						}

					}
				});

				console.log("验证正确");
			} else {
				console.log("验证码错误");
			}
		}
	}
}