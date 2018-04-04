import myajax from "@/tool/myajax.js"

export default{
	kindList(cb){
		const config={
			url:"http://localhost:3000/api/product/kind",
			options:{},
			success:(data)=>{
				cb(data)
			}
		}
		
		myajax.fetch(config)
	}
}


