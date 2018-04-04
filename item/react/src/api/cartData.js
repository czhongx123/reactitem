import myajax from "@/tool/myajax.js"

export default{
	cartList(cb){
		const config={
			url:"http://localhost:3000/api/product/cart",
			options:{},
			success:(data)=>{
				cb(data)
			}
		}
		
		myajax.fetch(config)
	},
	
	delAction(delitem,cb){
		const config={
			url:"http://localhost:3000/api/product/del?delitem="+delitem,
			options:{},
			success:(data)=>{
				cb(data)
			}
		}
		
		myajax.fetch(config)
	}
	
}


