import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'



class Register extends Component {
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

export default Register;
