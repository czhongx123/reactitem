import React, { Component } from 'react';

import './header.scss'

class Header extends Component {
	goBack(){
		window.history.go(-1)
		}

  render() {
  	
  	
  	
    return (
      <div className="commonheader">
       	<span onClick={this.goBack.bind(this)} className='iconfont icon-fanhui5'></span>
       	<p>
       		{
       			this.props.titcon
       		}
       	</p>
       	<span className='right'>
       		{
       			this.props.right!=undefined ? this.props.right : ""
       		}
       	</span>
      </div>
    );
  }
}

export default Header;
