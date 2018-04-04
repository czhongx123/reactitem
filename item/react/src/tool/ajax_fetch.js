import fetchJsonp from 'fetch-jsonp'
import qs from 'qs'

export default ({url,data,method,success,jsonp,headers}) => {
  let send = jsonp ? fetchJsonp : fetch ;
  let body = null;
  if(method === "post"){
    body = new FormData();
    for(var item in data){
      body.append(item,data[item])
    }
  }else{
    method = "get";
    let str = "";
//		for(let item in data){
//			str+= item + "=" + data[item] + "&";
//		}
//		url+= "?" + str; 
url+= "?" + qs.stringify(data);
  }
  
  send(url, { method, body, headers,Type:"xhr" })
    .then( res => res.json() )
    .then( data => success(data) )
    .catch( err => console.log(err) )

}
