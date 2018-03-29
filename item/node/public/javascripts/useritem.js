$(function() {

	$('.load').click(function() {
		var sexyitem = $('input[name="sexy"]:checked').val();
		var keyitem = $('.keyItem  option:selected').text();
		var addobj = {
			username: $('.username').val(),
			password: $('.psd').val(),
			id: $('.nameid').val(),
			classid: $('.classid').val(),
			position: $('.position').val(),
			name: $('.name').val(),
			sexy: sexyitem,
			key: keyitem,
			status: "1"
		};

		var flag = true;
		//内容不能为空
		for(var i in addobj) {

			if(addobj[i] == "") {

				flag = false;

			}
		}

		if(flag) {
			$.ajax({
				type: "post",
				url: "/manager/adduserAction",
				data: addobj,
				success: function(data) {
					console.log(data);
					if(data == "1") {

						window.location.href = "/manager"

					} else {
						alert("用户已存在")

					}
				}
			});
		} else {
			alert("请完整填写数据")
		}

	})

	$('.cancel').click(function() {
		window.location.href = '/manager'
	})

})