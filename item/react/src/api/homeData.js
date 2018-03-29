import myajax from "@/tool/myajax.js"

export default{
	bannerList(cb){
		const config={
			url:"http://localhost:3000/api/banner",
			options:{},
			success:(data)=>{
				cb(data)
			}
		}
		
		myajax.fetch(config)
	}
}


