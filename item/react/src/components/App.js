import React, { Component } from 'react';
import { Switch,Route,Redirect ,NavLink} from 'react-router-dom'
import Home from '@/components/main/Home/index.js'
import Kind from '@/components/main/Kind/index.js'
import Integral from '@/components/main/Integral/index.js'
import Cart from '@/components/main/Cart/index.js'
import User from '@/components/main/User/index.js'
import detailData from "@/api/detailData"

class App extends Component {
	state={
  		cartnum:''
  	}
  render() {
  	
    return (
      <div className="App">
       	<div className='container'>
       		<Switch>
       				<Route path='/home' component={ Home } />
       				<Route path='/kind' component={ Kind } />
       				<Route path='/integral' component={ Integral } />
       				<Route path='/cart' component={ Cart } />
       				<Route path='/user' component={ User } />
       				
       				<Redirect to={{pathname:"/home"}} />
       		</Switch>
        </div>
        <footer>
        	<ul>
        		<li>
        			<NavLink to='/home' activeClassName='active'>
        				<span className='iconfont icon-shouye1'></span>
									<p>首页</p>
        			</NavLink>
        		</li>
        		<li>
        			<NavLink to='/kind' activeClassName='active'>
        				<span className='iconfont icon-fenlei'></span>
									<p>分类</p>
        			</NavLink>
        		</li>
        		<li>
        			<NavLink to='/integral' activeClassName='active'>
        				<span className='iconfont icon-jifenshangchengb'></span>
									<p>松鼠币商城</p>
        			</NavLink>
        		</li>
        		<li className='homecart'>
        			<NavLink to='/cart' activeClassName='active'>
        				<span className='iconfont icon-msnui-cart'></span>
									<p>购物车</p>
									<em>{this.state.cartnum!=0 ? this.state.cartnum :""}</em>
        			</NavLink>
        		</li>
        		<li>
        			<NavLink to='/user' activeClassName='active'>
        				<span className='iconfont icon-wode1'></span>
									<p>个人中心</p>
        			</NavLink>
        		</li>
        	</ul>
        </footer>
      </div>
    );
  }
  
	componentDidMount(){
		detailData.cartnum((data)=>{
			console.log(data)
			this.setState({
				cartnum:data.num
			})
		})
		
	 }
  
}

export default App;
