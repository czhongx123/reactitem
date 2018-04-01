import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import store from '@/store/index.js'
import './homebanner2.scss'

class Homebanner2 extends Component {

	state = {
		data: ['1', '2', '3','4'],
		imgHeight: 400,
		slideIndex: 0,
	}

	render() {
		

		return(
			<div className="homebanner2">
      		
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
         
        >
       
          {(store.getState().homebanner2)[0]!=undefined ? (store.getState().homebanner2)[0].map((val, index) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: 'block',
                position: 'relative',
                top: this.state.slideIndex === index ? -10 : 0,
                height: this.state.imgHeight,
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <img
                src={val.pic}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
              
              <p>
             	
              		
	              	<span>
	              	仅剩
	              	{
					
	              		
	              		Math.floor((((this.props.home2data)[index].countdown)/3600)/24)	
	              	
	              	}
	              	天
	              	</span>
	              	<span>
	              	
	              	{
	              		
	              			
	              		Math.floor((((this.props.home2data)[index].countdown)/3600)%24)	
	              		
	              	}
	              	小时
	              	</span>
	              	<span>
	              	
	              	{
	              		
	              			
	              		Math.floor((((this.props.home2data)[index].countdown)/60)%60)	
	              		
	              	}
	              	分
	              	</span>
	              	<span>
	              
	              	
	              	{
	              	
	              			
	              		Math.floor((((this.props.home2data)[index].countdown)/1)%60)	
	              		
	              	}
	              	秒
	              	</span>
	              
	             
	              	
	            
              </p>
            </a>
          )) : [1,2,3,4] }
        </Carousel>
       
       
       
       
       
      	</div>
		)
	}

	componentDidMount() {
		

		setTimeout(() => {
			this.setState({
				data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI','243'],
			});
		}, 1000);


		
		

		

	}
	componentWillUnmount() {
   		 
	}

}

export default Homebanner2;