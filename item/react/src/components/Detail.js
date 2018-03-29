import React, { Component } from 'react';
import { NavLink} from 'react-router-dom'



class Detail extends Component {
  render() {
    return (
      <div className="App">
       	<div className='container'>
       	
       	
       	
        </div>
        <footer>
        	<ul>
        		<li>
        			<NavLink to='/home' activeClassName='active'>
        				<span className='iconfont icon-shouye'></span>
									<p>收藏</p>
        			</NavLink>
        		</li>
        		<li>
        			<NavLink to='/kind' activeClassName='active'>
        				<span className='iconfont icon-fenlei'></span>
									<p>店铺</p>
        			</NavLink>
        		</li>
        		<li>
        			<NavLink to='/cart' activeClassName='active'>
        				<span className='iconfont icon-gouwuche'></span>
									<p>加入购物车</p>
        			</NavLink>
        		</li>
        		<li>
        			<NavLink to='/user' activeClassName='active'>
        				<span className='iconfont icon-wode'></span>
									<p>购买</p>
        			</NavLink>
        		</li>
        	</ul>
        </footer>
      </div>
    );
  }
}

export default Detail;
