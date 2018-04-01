import React, { Component } from 'react';

import './Nav1.scss'

class Nava extends Component {

	state = {
		
		
		
	}

	render() {

		return(
		<div className="nav1" >
      		<ul>
      		
      			{
      				this.props.navadata.map((item,index)=>{
      					return(
      						<li key={index}>
	      						<a>
	      						
	      							<img src={item.pic} alt='' />
	      						</a>
      						</li>
      						
      					)
      				})
      				
      			}
      			</ul>
      
       
       
      	</div>
		)
	}

	componentDidMount() {
		
	}
}

export default Nava;