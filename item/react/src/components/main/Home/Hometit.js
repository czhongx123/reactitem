import React, { Component } from 'react';

import './hometit.scss'
class Hometit extends Component {

	state = {
		
	}

	render() {

		return(
			<div className="hometit">
      			<span>&nbsp;</span>
      			<em>{this.props.titdata}</em>
      		</div>
		)
	}

	componentDidMount() {

		
	}

}

export default Hometit;