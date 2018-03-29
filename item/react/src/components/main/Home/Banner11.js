import React, {
	Component
} from 'react';
import HomeDate from '@/api/homeData.js'

class Banner extends Component {

	state = {

	}

	render() {

		return(
			<div className="banner">
      <div className="swiper-container" >
   		 <div className="swiper-wrapper">
 
        	{
        		this.props.bannerdata.map((item,index)=>{
        			return (
        	<div className="swiper-slide"  key={index}><img src={item.img} /></div>
        				
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