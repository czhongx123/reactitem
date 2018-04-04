import React, {
	Component
} from 'react';
import { Link } from 'react-router-dom'
import Header from "./Header.js"
import detailData from "@/api/detailData"

import Banner from './Detailbanner.js'
import './detail.scss'

class Detail extends Component {
	state={
		bannerlist:[1,2,3,4,5,6,7,8,9,10],
		title:'',
		description:'',
		conmoninfo:{},
		buynumber:'',
		cartnum:'',
		productid:''
	}
	
	
	//点击加入购物车
	addcart(){
		
		var obj={
			num:1,
			goodsID:this.state.productid,
			title:this.state.title,
			pic:this.state.bannerlist[0],
			price:Number(this.state.conmoninfo.salesPrice.value).toFixed(2)
			
		}
		
		console.log(obj)
		
		detailData.addcart(obj.goodsID,obj.num,obj.title,obj.pic,obj.price,(data)=>{
			
			console.log(data,'232432432s')
			
			if(data=='1'){
				
				detailData.cartnum((data)=>{
					console.log(data)
					this.setState({
						cartnum:data.num
					})
				})
				
			}
			
			
		})
		
		
		
		
		
	}
	
	render() {
		return(
			<div className="App">

       	<div className='container'>
       			<div className='box'>
      				<header>
       						<Header titcon="商品详情" />
      	
      				</header>
       			<div className='content'>
      
        		<Banner bannerdata={this.state.bannerlist}  />
      			
      			<div className='detailinfo'>
      				<p>{this.state.title}</p>
      				<p>{this.state.description}</p>
      				<p>
  		
      	<span>{this.state.conmoninfo.salesPrice!=undefined ? Number(this.state.conmoninfo.salesPrice.value).toFixed(2) : ""}</span>
      					<em>{this.state.conmoninfo.salesPrice!=undefined ? Number(this.state.conmoninfo.marketPrice.value).toFixed(2) :""}</em>
      					<strong>总销量{this.state.conmoninfo.salesPrice!=undefined ? this.state.conmoninfo.saleCount :''}</strong>

      					
      				</p>
      			</div>
      
      
      
      
       			</div >
       		</div >
        </div>
        <footer>
        	<ul>
        		<li>
        			<Link to='/cart' >
        				<span className='cartnum' ><img src="http://m.3songshu.com/resources/images/icon-cart-white@2x.45c6b808.png" /><em>{this.state.cartnum!=0 ? this.state.cartnum :""}</em>
        				</span>
						<p className='moveup'>购物车</p>
        			</Link>
        		</li>
        		<li className='inheart'>
        			<Link to='/inheart' >
        				<span className='iconfont icon-shoucang'></span>
									<p className='moveup'>收藏</p>
        			</Link>
        		</li>
        		<li>
        			<a onClick={this.addcart.bind(this)}>
        				
									<p className='addcart' >加入购物车</p>
        			</a>
        		</li>
        		<li>
        			<a  >
        				
									<p  className='buynow'>立即购买</p>
        			</a>
        		</li>
        	</ul>
        </footer>
      </div>
		);
	}
	
	componentDidMount(){
		var goodsID=this.props.location.pathname.split('/')[2];
		console.log()
		
		detailData.detailList(goodsID,(data)=>{
			
			console.log(data)
			this.setState({
				title:data.data1.name,
				description:data.data1.description,
				bannerlist:data.data1.pics,
				conmoninfo:data.data,
				productid:goodsID
			})
			
			
		})
		detailData.cartnum((data)=>{
			console.log(data)
			this.setState({
				cartnum:data.num
			})
		})
		
		
		
	}
	
	
}

export default Detail;