//删除banner图
function del(id, sortID) {
	console.log(id);
	if(confirm("确认删除该图片吗？")) {

		$.ajax({
			type: "post",
			url: "/banner/deluser",
			data: {
				id: id,
				sortID: sortID
			},
			success: function(data) {
				if(data == "1") {
					window.location.href = '/banner'
				}
			}
		});
	} else {
		window.location.href = '/banner'
	}
}
//上移
function up() {

	$('.up').click(function() {

		var sortID = $(this).attr('sortID');
		console.log(sortID)
		if(sortID == "1") {
			location.href = "/banner";
		} else {
			var pre = $(this).parent().parent().prev()
			var preID = pre.attr('id');
			var cur = $(this).parent().parent()
			var curID = cur.attr('id');
			console.log(preID, curID);

			$.ajax({
				type: "post",
				url: "/banner/upsortID",
				data: {
					preID: preID,
					curID: curID
				},
				success: function(data) {
					console.log(data);
					if(data == "1") {
//						cur.prev().before(cur);
						location.href = "/banner"
					}
				}
			});

		}

	})
}
up();

//修改banner图	
function modify(id) {
	
	$.ajax({
		type: "post",
		url: "/banner/modifyAction",
		data: {
			id: id
		},
		success: function(data) {

			$("#modstyle").html('修改内容')
			$('form').attr('action', "/banner/modify");
			$(".id").attr("readonly", "readonly");
			//					console.log(data);

			$(".id").val(data[0].id);
			$(".url").val(data[0].img);
			$(".link").val(data[0].link);
			
			
			//如果有取消的按钮则不在显示取消的按钮
			if(!$('.cancelmod').find('.cancel').length){
			
				$('.cancelmod').append('<button class="button bg-yellow icon-share cancel" type="button"> 取消</button>');
			}
			
			$('.cancel').click(function() {
				location.href = '/banner';
			})
			
		}
	});

}