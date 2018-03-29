//修改管理员信息	
function modify(id) {

	window.location.href = "/manager/modifyuser?id=" + id;

}

//删除数据
function del(id) {
	console.log(id);
	if(confirm("确认删除该用户吗？")) {

		$.ajax({
			type: "post",
			url: "/manager/deluser",
			data: {
				id: id
			},
			success: function(data) {
				if(data == "1") {
					window.location.href = '/manager'
				}
			}
		});
	}
}

//状态启用与禁用
function status() {

	$(".status").each(function() {

		if($(this).attr('status') == "1") {

			$(this).addClass("bg-blue").html('已启用').removeClass("bg-gray");
		} else {
			$(this).addClass("bg-gray").html('已禁用').removeClass("bg-blue");
		}

	})

}

$('.status').click(function() {

	if($(this).hasClass("bg-blue")) {
		$(this).addClass("bg-gray").html('已禁用').removeClass("bg-blue").attr('status', "0");

	} else {
		$(this).addClass("bg-blue").html('已启用').removeClass("bg-gray").attr('status', "1");
	}

	var status = $(this).attr('status');

	var id = $(this).parent().parent().attr('id');
	var data = {
		status: status,
		id: id
	}
	console.log(data)

	$.ajax({
		type: "post",
		url: "/manager/changeState",
		data: data,
		success: function(data) {

			console.log(data);
		}
	});

})

status();




