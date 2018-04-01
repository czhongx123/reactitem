import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

import './banner.scss'

class Banner extends Component {

	state = {
		data: ['1', '2', '3','4','5','6'],
		imgHeight: 400,
		slideIndex: 0
	}

	render() {

		return(
			<div className="banner">
      		
        <Carousel autoplay infinite selectedIndex={0}
       
          dragging={true}
          swiping={true}
         
        
          resetAutoplay={false}>
        {
        	
          	this.props.bannerdata.map((item,val) => {
          		
          	return (	
          		
            <a key={val} href="#"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img src={item.pic}

                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
            )
            
          })
          	
        }
          
          
          
        </Carousel>
       
       
       
       
       
      	</div>
		)
	}

	componentDidMount() {

		setTimeout(() => {
			this.setState({
				data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI','21','231','2321'],
			});
		}, 100);

	}

}

export default Banner;