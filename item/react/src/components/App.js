import React, { Component } from 'react';
import { Switch,Route,Redirect ,NavLink} from 'react-router-dom'
import Home from '@/components/main/Home/index.js'
import Kind from '@/components/main/Kind/index.js'
import Cart from '@/components/main/Cart/index.js'
import User from '@/components/main/User/index.js'


class App extends Component {
  render() {
    return (
      <div className="App">
       	<div className='container'>
       		<Switch>
       				<Route path='/home' component={ Home } />
       				<Route path='/kind' component={ Kind } />
       				<Route path='/cart' component={ Cart } />
       				<Route path='/user' component={ User } />
       				
       				<Redirect to={{pathname:"/home"}} />
       		</Switch>
        </div>
        <footer>
        	<ul>
        		<li>
        			<NavLink to='/home' activeClassName='active'>
        				<span className='iconfont icon-shouye'></span>
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
        			<NavLink to='/cart' activeClassName='active'>
        				<span className='iconfont icon-gouwuche'></span>
									<p>购无车</p>
        			</NavLink>
        		</li>
        		<li>
        			<NavLink to='/user' activeClassName='active'>
        				<span className='iconfont icon-wode'></span>
									<p>我的</p>
        			</NavLink>
        		</li>
        	</ul>
        </footer>
      </div>
    );
  }
}

export default App;
