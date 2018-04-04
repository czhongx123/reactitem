import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import kindData from '@/api/kindData'
class Kind extends Component {
  
  state = {
    kinddata:[]
  }
  
  render() {
    
    return (
      <div className="box">
        <header>
        		分类
        </header>
        <div className = "content">
        		
        			<NavLink to='/search/100100487' >到search</NavLink>
        			
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    kindData.kindList((data)=>{
    	this.setState({
    		kinddata:data
    	})
    })
  }
  
}

export default Kind;