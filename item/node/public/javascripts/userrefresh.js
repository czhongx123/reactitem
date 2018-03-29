$(function() {

	//选择性别
	function sexyselect() {

		var sexy = $("#ishome").parent().attr('key');
		if(sexy == "女") {
			$("#isvouch").attr('checked', 'checked');
			$("#ishome").removeAttr("checked", 'checked');
		} else {
			$("#isvouch").removeAttr('checked', 'checked');
			$("#ishome").attr("checked", 'checked');
		}
		$("#isvouch").click(function() {
			$(this).attr("checked", 'checked');
			$("#ishome").removeAttr('checked', 'checked');
		})
		$("#ishome").click(function() {
			$(this).attr("checked", 'checked');
			$("#isvouch").removeAttr('checked', 'checked');
		})

	}
	sexyselect();

	//角色选择

	function keyselect() {
		var key = $('.keyselect').attr('key');
		
		$('option').each(function() {

			if($(this).html() == key) {
			
				$(this).attr('selected', true)

			}

		})

	}
	keyselect();

	//点击取消
	$('.cancel').click(function() {
		window.location.href = '/manager'
	})

	//点击进行修改
	$('.load').click(function() {
		var sexyitem = $('input[name="sexy"]:checked').val();
		console.log(sexyitem);
		var keyitem = $('.keyItem  option:selected').text();
		var addobj = {
			username: $('.username').val(),
			//			password: $('.psd').val(),
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
				url: "/manager/modifyuserAction",
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

	//点击返回
	$('.cancel').click(function() {
		window.location.href = '/manager'
	})

})