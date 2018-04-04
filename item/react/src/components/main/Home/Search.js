import React, {
	Component
} from 'react';

import {NavLink} from 'react-router-dom'
class Search extends Component {

	state = {
		
	}

	

	render() {

		return(
			<div className="search">
      	
      			搜索页
        			<NavLink to='/detail/100100011' >到详情</NavLink>
     			
      		</div>
		)
	}

	componentDidMount() {
		
	}

}

export default Search;