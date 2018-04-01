import React, { Component } from 'react';
import HomeDate from '@/api/homeData.js'
import Banner from './Banner.js'
import Advice from './Advice.js'
import Topten from './Topten.js'
import Hometit from './Hometit.js'
import Nava from './Nava.js'
import Navb from './Navb.js'
import Homebanner2 from './Homebanner2.js'
import Homebanner3 from './Homebanner3.js'
import Homebottom from './Homebottom.js'
//import Search from './Search.js'

import MyButton from './MyButton.js'
import store from '@/store/index.js'

class Home extends Component {

	state = {
		bannerlist: [1,2,3,4,5,6],
		advicelist:[],
		topten:[],
		val: '', //用来储存输入框中的值
		flag: false ,//显示aaa还是bbb
		recommendActivitys:[1,2,3,4],
		recommendAdvs:[],
		middleAvs:[],
		homebanner3:[],
		homebottomlist:[],
		homebanner3time:'',

	}
	getValHandler(event) {
		this.setState({
			val: event.target.value
		})
	}
	addItemHandler() {
		
		store.dispatch({
			type: 'ADD_TODO_ITEM',
			data: this.state.val
		})
	}
	delItemhandler(index) {
//		console.log(index)
		store.dispatch({
			type: "DEL_TODO_ITEM",
			data: index
		})
	}
	
	
	
	
	render() {
		
		return(
			<div className="box">
		{	
//      <header>
//      	<Search />
//      </header>
        
       }
        <div className = "content">
        	{
//      		console.log(this.state)
        	}
        	
        		<Banner bannerdata={this.state.bannerlist}  />
        		<Advice advicedata={this.state.advicelist} />
        		<Nava navadata={this.state.middleAvs} />
        		
        		<Navb navbdata={this.state.recommendAdvs}/>	
        		
        		<Hometit titdata="特价专场" />
        	
        		<Homebanner2 home2data={this.state.recommendActivitys}  />
        		<Homebanner3 home3data={this.state.homebanner3} home3time={this.state.homebanner3time} />
        		
        		<Hometit titdata="本周卖的最好的10款零食" />
        		
        		
        		<Topten   />
        		
        		<Hometit titdata="昨日买的最好的20件商品" />
       			
        		<Homebottom homebottomdata={this.state.homebottomlist}/>
        		
        	{
        		
//      	<MyButton flag={this.state.flag} todolist={store.getState().todolist} getVal={this.getValHandler.bind(this)} onClick={this.addItemHandler.bind(this)} onDelfn={this.delItemhandler.bind(this)} />
        	
        	}		
        		
        </div>
        

      </div>

		)
	}

	componentDidMount() {
		
		
		
		HomeDate.bannerList((data) => {
			
			this.setState({
				bannerlist: data[0].carousel,
				advicelist:data[0].channels,
				middleAvs:data[0].recommendChannel.middleAdvs,
				topten:data[0].recommendChannel.promotions,
				recommendAdvs:data[0].recommendChannel.recommendAdvs,
				recommendActivitys:data[0].recommendChannel.recommendActivitys.items,
				homebanner3:data[0].recommendChannel.flashSale,
				homebanner3time:data[0].recommendChannel.flashSale.countDown,
				homebottomlist:data[0].recommendChannel.floors[0].products
				
			})
			
			store.dispatch({
			type: "HOME_TOPTEN",
			data: data[0].recommendChannel.promotions
			})
			
			store.dispatch({
			type: "HOME_BANNER2",
			data: data[0].recommendChannel.recommendActivitys.items
			})
			
			this.state.homebanner3time=this.state.homebanner3time/1000;
			
			
			for(var i=0;i<data[0].recommendChannel.recommendActivitys.items.length;i++){
				this.state.recommendActivitys[i].countdown=this.state.recommendActivitys[i].countdown/1000
					
					
				}
			
			
			
			
			this.timer=setInterval(()=>{
				
			
				this.state.homebanner3time-=1;
				
				for(var i=0;i<data[0].recommendChannel.recommendActivitys.items.length;i++){
				this.state.recommendActivitys[i].countdown-=1
					
					
				}
			
			this.setState({				
				homebanner3time:this.state.homebanner3time,
			
			})
			

			
				
				
				
			},1000)
			
		})
		
		
		
		

	}
	componentWillUnmount() {
   		 clearInterval(this.timer);
	}

}

export default Home;