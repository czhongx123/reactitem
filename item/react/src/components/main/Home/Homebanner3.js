import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

import './homebanner3.scss'

class Homebanner3 extends Component {

	state = {
		data: ['1', '2', '3','4','5','6'],
		imgHeight: 200,
		slideIndex: 0
	}

	render() {

		return(
			<div className="banner3">
			
			<div className="banner3left">
				<div>
					<p>距离秒杀结束</p>
					
					<p>
						<span>{Math.floor(this.props.home3time/3600%24)}:</span>
						<span>{Math.floor(this.props.home3time/60%60)}:</span>
						<span>{Math.floor(this.props.home3time%60)}</span>
					</p>
					
				</div>
				<img src={this.props.home3data.pic} style={{with:"2rem"}} />
      		</div>
        <Carousel autoplay infinite selectedIndex={0}
       
          dragging={true}
          swiping={true}
         
        
          resetAutoplay={false}>
        {
        	this.props.home3data.products !=undefined ?
          	this.props.home3data.products.map((item,val) => {
          		
          	return (	
          		
            <a key={val} href="#"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
            
              <img src={item.pic}

                style={{ width: '60%', verticalAlign: 'top'}}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
              <div className="bannercon" style={{padding: '0 0 0 0.05rem',position:'relative'}}>
	            <p className="title" style={{color: '#333',fontSize:"0.12rem"}}>{item.name}</p>
	            <p>
	            	<span style={{color: '#f66',fontSize:"0.14rem",padding: '0 0.1rem 0 0'}}>{item.salesPrice.toFixed(2)}</span>
	            	<em style={{color: '#999',fontSize:"0.12rem",textDecoration:"line-through"}}>{item.marketPrice.toFixed(2)}</em>
	            </p>
	            <p className="iconfont icon-jiarugouwuche" style={{color: '#77bc1f',fontSize:"0.28rem",position:'absolute',top:'0',right:'0.15rem'}}></p>
	            
	        </div>
              
            </a>
            )
            
          }) :[1,2,3,4]
          	
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

export default Homebanner3;