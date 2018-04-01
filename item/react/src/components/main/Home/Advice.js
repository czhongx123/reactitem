import React, {
	Component
} from 'react';
import { Carousel } from 'antd-mobile';
import './advice.scss'

class Advice extends Component {

	constructor(props) {
		super(props);
		this.state = {
			contentClass: "conditionArea"
		};
		this.windowOnScroll();
		let isScrollTop = true;
	};
	windowOnScroll() {
		let _this = this;
		
		window.onscroll = function() {
			console.log(13214324)
			//获取滚动条滚动的距离
			let h = document.body.scrollTop;
			console.log(h);
			if(h > 74) {
				console.log('111');
				_this.setState({
					contentClass: "conditionArea conditionArea_fixed"
				});
			} else {
				_this.setState({
					contentClass: "conditionArea"
				});
			}
		}
	};

	render() {

		return(
			<div className="advice" id='wrap'>
				<ul>
      			{
      				this.props.advicedata.map((item,index)=>{
      					return(
      						<li key={index}><a>{item.name}</a></li>
      						
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

export default Advice;