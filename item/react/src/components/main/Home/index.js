import React, {
	Component
} from 'react';
import HomeDate from '@/api/homeData.js'
//import Banner from './Banner.js'
import Search from './Search.js'

import MyButton from './MyButton.js'
import store from '@/store/index.js'

class Home extends Component {

	state = {
		bannerlist: [],
		val: '', //用来储存输入框中的值
		flag: false //显示aaa还是bbb

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
		console.log(index)
		store.dispatch({
			type: "DEL_TODO_ITEM",
			data: index
		})
	}

	render() {
		
		return(
			<div className="box">
        <header>
        	<Search />
        </header>
        <div className = "content">
        	{
        	
//      		<Banner bannerdata={this.state.bannerlist} />
        		
        	}	
        		
        		
        	<MyButton flag={this.state.flag} todolist={store.getState().todolist} getVal={this.getValHandler.bind(this)} onClick={this.addItemHandler.bind(this)} onDelfn={this.delItemhandler.bind(this)} />
        		
        		
        		
        </div>
        
        
        
        
        
        
      

      </div>

		)
	}

	componentDidMount() {
		HomeDate.bannerList((data) => {
			console.log(data.result);
			this.setState({
				bannerlist: data.result
			})
		})

	}

}

export default Home;