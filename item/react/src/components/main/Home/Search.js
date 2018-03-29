import React, {
	Component
} from 'react';

import { SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';

class Search extends Component {

	state = {
		value: '美食'
	}

	onChange = (value) => {
		this.setState({
			value
		});
	};
	clear = () => {
		this.setState({
			value: ''
		});
	};
	handleClick = () => {
		this.manualFocusInst.focus();
	}

	render() {

		return(
			<div className="search">
      	
      
      <SearchBar
        placeholder="Search"
        ref={ref => this.manualFocusInst = ref}
      />
       
       
      		</div>
		)
	}

	componentDidMount() {
		
	}

}

export default Search;