import myajax from "@/tool/myajax.js"

export default{
	detailList(goodsID,cb){
		const config={
			url:"http://localhost:3000/api/product/detail?goodsId="+goodsID,
			options:{},
			success:(data)=>{
				cb(data)
			}
		}
		
		myajax.fetch(config)
	},
	cartnum(cb){
		const config={
			url:"http://localhost:3000/api/product/cartnum",
			options:{},
			success:(data)=>{
				cb(data)
			}
		}
		
		myajax.fetch(config)
	},
	addcart(id,num,title,pic,price,cb){
		const config={
			url:"http://localhost:3000/api/product/addcart?id="+id+"&num="+num+"&title="+title+"&pic="+pic+"&price="+price,
			options:{},
			success:(data)=>{
				cb(data)
			}
		}
		
		myajax.fetch(config)
	}
}


