import React, { Component } from 'react';

import './Nav2.scss'

class Navb extends Component {

	state = {
		
	}

	render() {

		return(
		<div className="nav2">
      		<ul>
      			{
      				this.props.navbdata.map((item,index)=>{
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

export default Navb;