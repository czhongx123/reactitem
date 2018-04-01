import React, { Component } from 'react';

import store from '@/store/index.js'
import './topten.scss'
class Topten extends Component {

	state = {
		
	}
	
	

	render() {

		return(
			<div className="topten">
      			
      		
      			<ul>
      			
      			
      				
      				
      			{
      				(store.getState().hometopten)[0]!==undefined ? ((store.getState().hometopten)[0]).map((item,index)=>{
			
			
			
	    	return(
	      			<li key={index}>
	      				<img src={item.pic} />
	      			</li>
	      			
	      		)
	    }) : ''
      			}
      			

      			
      			</ul>
      				
      				
      				
      		</div>
		)
	}

	componentDidMount() {
			
			
		
	}

}

export default Topten;