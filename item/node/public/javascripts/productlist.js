//搜索
function changesearch() {

	$.ajax({
		type: "post",
		url: "/product/search",
		data: {
			con: $('.searchInput').val(),

		},
		success: function(data) {

			var data = data.result;

			$('.rendertab tr:gt(0)').remove();
			$('#kkpager').remove();

			data.map(function(value, i) {

				$('.rendertab').append(

					`<tr id="${value.shopId} ">
						<td style="text-align:left; padding-left:20px;">
							<span style="display: inline-block;width: 20px;">${i+1}</span>
							<input type="checkbox" class="sign" name="id[]" value="" />
						</td>
						<td>
							${value.shopId}
						</td>
						<td>
						${value.props}
							
						</td>
						<td width="10%"><img src="${value.img}" alt="" width="70" height="50" /></td>
						<td>
						${value.title}
							
						</td>
						<td>
							${value.link}
						</td>
						<td>
							${value.orgPrice}
						</td>
						<td>
							${value.price}
						</td>
						<td>
							${value.sale}
						</td>

						<td>
							<div class="button-group">
								<a class="button border-main" href="/product/modifyproduct?shopId=${value.shopId}"><span class="icon-edit"></span> 修改</a>
								<a class="button border-red" href="javascript:void(0)" onclick="del(${value.shopId})"><span class="icon-trash-o"></span> 删除</a>
							</div>
						</td>
					</tr>`)
			})

		}
	})
}

//价格排序
$('.sale').click(function() {

	
	
	if($(this).find('span').hasClass("icon-sort-down")) {
		window.location.href = '/product?pageNO=1&sort=1'

	} else {

		window.location.href = '/product?pageNO=1&sort=-1'

	}

})

//单个删除
function del(shopId) {
	if(confirm("您确定要删除吗?")) {
		$.ajax({
			type: "post",
			url: "/product/delproduct",
			data: {
				shopId: shopId
			},
			success: function(data) {
				if(data == "1") {
					window.location.href = '/product?pageNO=1&sort=0'
				}
			}
		});

	}
}
//word-break：break-all
//全选
function slectAll() {

	if($('.sign').prop("checked")) {
		$('.sign').prop('checked', false);
	} else {
		$('.sign').prop('checked', 'checked')

	}

}
$('.sign').click(function() {

	if($(this).attr('checked') == 'checked') {
		$(this).removeAttr('checked')
	} else {
		$(this).attr('checked', 'checked')
	}

})
//批量删除
var arr = [];
$('.delSign').click(function() {

	$('.sign').each(function() {
		if($(this).is(':checked')) {
			arr.push($(this).parent().parent().attr('id'))
		}
	});
	if(arr.length > 0) {

		if(confirm('确认删除标记？')) {

			$.ajax({
				type: "post",
				url: "/product/delsign",
				data: {
					id: arr + ""
				},
				success: function(data) {
					if(data == "1") {

						location.href = '/product?pageNO=1&sort=0'
					} else {
						alert('刷新页面后操作')
					}
				}
			});
		}

	}else{
		
		alert('您还未选中任何产品');
		location.href="/product"

	}
})

//分页
function getParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

var totalPage = $('.rendertab').attr('page');
var totalRecords = $('.rendertab').attr('count');
var pageNo = getParameter('pno');
if(!pageNo) {
	pageNo = 1;
}

//生成分页
//有些参数是可选的，比如lang，若不传有默认值
//kkpager.generPageHtml.selectPage(3);
kkpager.generPageHtml({
	pno: pageNo,
	//总页码
	total: totalPage,
	//总数据条数
	totalRecords: totalRecords,
	mode: 'click', //默认值是link，可选link或者click
	click: function(n) {
		//			console.log(n);

		// do something

		//手动选中按钮
//		console.log(location.search=="")
//		console.log(location.search=="undefined")
//		console.log(location.search==undefined)
		if(location.search!=""){
			
			var cursort = location.search.split("=")[2];
		}else{
			var cursort=0;
			
		}
//		console.log(cursort)
		

		window.location.href = "/product?pageNO=" + n + "&sort="+cursort
		this.selectPage(n);
		//					console.log(this)
		return false;
	}

	/*
	,lang				: {
		firstPageText			: '首页',
		firstPageTipText		: '首页',
		lastPageText			: '尾页',
		lastPageTipText			: '尾页',
		prePageText				: '上一页',
		prePageTipText			: '上一页',
		nextPageText			: '下一页',
		nextPageTipText			: '下一页',
		totalPageBeforeText		: '共',
		totalPageAfterText		: '页',
		currPageBeforeText		: '当前第',
		currPageAfterText		: '页',
		totalInfoSplitStr		: '/',
		totalRecordsBeforeText	: '共',
		totalRecordsAfterText	: '条数据',
		gopageBeforeText		: '&nbsp;转到',
		gopageButtonOkText		: '确定',
		gopageAfterText			: '页',
		buttonTipBeforeText		: '第',
		buttonTipAfterText		: '页'
	}*/
});

if(location.search!=""){
	
	var curpage = location.search.split("=")[1].split('&')[0];
}else{
	var curpage=1;
}
console.log(curpage)
kkpager.selectPage(curpage)
