$(function() {

	$('.load').click(function() {

		var numreg = /^\d+$/ig;
		console.log($('.num').val().match(numreg))
		$('.num').val().match(numreg);

		var addobj = {
			shopId: $('.nameid').val(),
			props: $('.kind').val(),
			title: $('.title').val(),
			img: $('.img').val(),
			link: $('.link').val(),
			orgPrice: $('.orgPrice').val(),
			price: $('.price').val(),
			sale: $('.sale').val()
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
				url: "/product/modifyproductAction",
				data: addobj,
				success: function(data) {
					console.log(data);
					if(data == "1") {

						window.location.href = "/product?pageNO=1&sale=0"

					} else {
						alert("产品已存在")

					}
				}
			});
		} else {
			alert("请完整填写数据")
		}

	})

	$('.cancel').click(function() {
		window.location.href = '/product?pageNO=1&sale=0'
	})

})