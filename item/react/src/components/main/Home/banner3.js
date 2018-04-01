import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';


class Banner extends Component {

	state = {
	
	}

	render() {

		return(
			<div className="banner">
      			{
      				console.log(this.props.bannerdata,'banner')
      			}
      			 <div className="swiper-container"  scrolling="no" frameborder="0">
   		 <div className="swiper-wrapper">
 
        	{
        		this.props.bannerdata.map((item,index)=>{
        			return (
        	<div className="swiper-slide"  key={index}><img src={item.pic} /></div>
        			
        			)
        		})

        	}
	        </div>
	        	 <div className="swiper-pagination"></div>
	    		
	       </div>
      			
      			
      			
      			
      			
      		</div>
		)
	}

	componentDidMount() {

		
	}

}

export default Banner;