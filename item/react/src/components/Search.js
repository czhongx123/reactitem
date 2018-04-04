import React, { Component } from 'react';
import { NavLink} from 'react-router-dom'



class Search extends Component {
	
	
  render() {
    return (
      <div className="App">
       	<div className='container'>
       
       
       
      搜索页
        			<NavLink to='/detail/100100487' >到详情</NavLink>
       	
        </div>
        
      </div>
    );
  }
}

export default Search;
