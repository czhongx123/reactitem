import React, {
	Component
} from 'react';
import { Link } from 'react-router-dom'

import cartdata from  '@/api/cartData'
import {  Modal, Button,Toast } from 'antd-mobile';
import './cart.scss'

class Cart extends Component {
	state={
		cartlist:[],
		allpay:'',
		selectAllState:'icon-duihao',
		paynumber:'',
		paystate:'noempty',
		right:'编辑',
		hideblock:'hide',
		showblock:''
	}
		
	

	
	
	
	
	//操作数量
	donumber(index,type){
		console.log(index,type)
		
		if(type==-1 && this.state.cartlist[index].num==1 ){
			this.state.cartlist[index].num=1
		}else{
			
			this.state.cartlist[index].num=Number(this.state.cartlist[index].num)+type;
			
		}

		this.setState({
			cartlist:this.state.cartlist
		})
		
		
		this.allprice();
		this.needpaynumber();
		
	}
	
	//选择所有
	selectAll(){
		if(this.state.selectAllState=="icon-duihao"){
			this.setState({
				selectAllState:"icon-yuanquanweixuanfuben",
				
			})
			
			for(var i=0;i<this.state.cartlist.length;i++){
			
			this.state.cartlist[i].select="iconfont icon-yuanquanweixuanfuben" 
			
			}
			
		}else{
			
			for(var i=0;i<this.state.cartlist.length;i++){
			
			this.state.cartlist[i].select="iconfont icon-duihao" 
			
			}

			
			this.setState({
				selectAllState:"icon-duihao",
				
			})
			
		}
		this.allprice();
		this.needpaynumber();
		

	}
	
	//单独选择
	singleClick(index){
		
		if(	this.state.cartlist[index].select=="iconfont icon-duihao"){
			this.state.cartlist[index].select="iconfont icon-yuanquanweixuanfuben"
		}else{
			this.state.cartlist[index].select="iconfont icon-duihao"
		}
		
		
		this.setState({
			cartlist:this.state.cartlist
		})
		
		this.allprice();
		this.needpaynumber();
	}
	
	//计算价格
	allprice(){
		
		var allmoney = 0;

			for(var i = 0; i < this.state.cartlist.length; i++) {

				if(this.state.cartlist[i].select=="iconfont icon-duihao") {

					allmoney += (this.state.cartlist[i].num) * (this.state.cartlist[i].price)
				}

			}

			this.state.allpay = allmoney.toFixed(2);
		
		
	}
	
	//获取结算的商品的数量
	
	needpaynumber(){
		
		if( this.state.cartlist.length>0){
			
		
		
		var num = 0;
			for(var i = 0; i < this.state.cartlist.length; i++) {

				if(this.state.cartlist[i].select=="iconfont icon-duihao") {

					num += Number(this.state.cartlist[i].num)
				}

			}
			if(num==0){
				this.setState({
					paystate:"empty"
				})
			}else{
				this.setState({
					paystate:"noempty"
				})
			}


			this.state.paynumber ="("+ num+")";
			
			
			
		}
		
		
	}
	//回到上一页
	goBack(){
		window.history.go(-1)
	}
	//编辑
	edit(){
		if(this.state.right=="编辑"){
			this.setState({
				right:"完成",
				showblock:"hide",
				hideblock:''
			})

			
		}else{
			this.setState({
				right:"编辑",
				showblock:"",
				hideblock:'hide'
			})
		}
		
	}
	//删除
	del(){
		
		var str='&';
		for(var i=0;i<this.state.cartlist.length;i++){
			
			if(this.state.cartlist[i].select=="iconfont icon-duihao"){
				str+=this.state.cartlist[i].id;
				str+="&"
			}
		}
		console.log(str)
		
		
		
		//引用mint-mobile的确认弹窗
		
			const alert = Modal.alert;

const showAlert = () => {
  const alertInstance = alert('Delete', 'Are you sure???', [
    { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
    { text: '确认', onPress: () => console.log('ok') , style: 'default'},
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    console.log('auto close');
    alertInstance.close();
  }, 1000);
};
	
		
		
		
		
		
		
		 alert('小主', '确定抛弃我吗？', [
          { text: 'Cancel', onPress: () => console.log('cancel') },
          {
            text: 'Ok',
            onPress: () =>
              new Promise((resolve) => {
               
               
               console.log('confirm')
               
               //进行删除操作
               
               
               cartdata.delAction(str,(data)=>{
               	console.log(data);
               	
               	if(data=="1"){
               		
               		 Toast.success('已删除', 1);
               		 window.history.go(0);
               	}
               	
               })
               
               
               
                setTimeout(resolve, 1000);
              }),
          },
        ])
		
		
		
	}
	
	
		
	
	render() {
		return(
			<div className="App">

       	<div className='container'>
       			<div className='box'>
      				<header>
       						<div className="commonheader">
       	<span onClick={this.goBack.bind(this)} className='iconfont icon-fanhui5'></span>
       	<p>
       		购物车
       	</p>
       	<span className='right' onClick={this.edit.bind(this)}>
       		{this.state.right}
       	</span>
      </div>
      				</header>
       			<div className='content'>
      
      			{
      				//购物车主页
      			}
      			
      			<div className='cartinfo'>
      	
      				<p className='cartit'>
      					<span>满39元免运费</span>
      					<em>已免运费<strong className="iconfont icon-jinggao"></strong></em>
      				</p>
      					
      				<ul>
      					{
      						
      					
      				this.state.cartlist.length!=0 ?
      				this.state.cartlist.map((item,index)=>{
      					
      			
      				return(
      						<li key={item.id}>
      								<span className={item.select} onClick={this.singleClick.bind(this,index)}></span>
      								<img src={item.pic} />
      								<div className="goodsifo">
      										<p>{item.title}</p>
      										<p>{item.price}</p>
      										<p>
      											<span onClick={this.donumber.bind(this,index,-1)}>-</span>
      											<em>{item.num}</em>
      											<span onClick={this.donumber.bind(this,index,1)}>+</span>
      											
      										</p>
      								</div>
      						</li>
      					)
      						
      					})	: ''
      						
      						
      					}
      				</ul>
      					
      	
      			</div>
      
      
      
      
       			</div >
       		</div >
        </div>
        <footer>
        	<div className="cartbuttom">
        		<p>
        			<span className={"iconfont"+" "+ this.state.selectAllState} onClick={this.selectAll.bind(this)}></span>全选
        		</p>
        		
        		<div className={this.state.showblock}>
        				<p><span className="needpay">应付:</span><em>{this.state.allpay}</em></p>
        				<p>总价:<span>{this.state.allpay}</span>优惠：<span>0.00</span></p>
        		</div>
        		
        		<p className={this.state.showblock+" "+this.state.paystate}>
        			<span>去结算</span>
        			<em>{this.state.paynumber=="(0)" ? "": this.state.paynumber}</em>
        		</p>
        		
        		<p className={this.state.hideblock+" "+"del"} onClick={this.del.bind(this)}>
        			删除
        		</p>
        		
        	</div>
        </footer>
      </div>
		);
	}
	
	componentDidMount(){
		

		
		
			cartdata.cartList((data)=>{
				console.log(data)
				
				for(var i=0;i<data.length;i++){
					data[i].select='iconfont icon-duihao'
				}
					
				this.setState({
					cartlist:data
				})
					this.allprice();
					this.needpaynumber();
					
			})
		

		
		
		
	}
	
	
}

export default Cart;