import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import './homebottom.scss'
class Homebottom extends Component {

	state = {

	}

	render() {

		return(
			<div className="homebottom">
      			
       			<ul>
       			
       			{
       			this.props.homebottomdata.length>0 ?
       			
       			this.props.homebottomdata.map((item,index)=>{
       				
       			return(
					<li className="hbottom" key={index}>
					<a >
						<img className="tags" src={item.tags.length>0 ? item.tags[0].pic : '' } alt="" />					
						<img className="pic" src={item.pic} alt="" />
						<div className="hbottomcon">
							<p className="hbottomalias">{item.alias}</p>
							<p className="hbottomtit">{item.name}</p>
							<p className="price">
								<span>{item.salesPrice.toFixed(2)}</span>
								<em>{item.marketPrice.toFixed(2)}</em>
							</p>
							<a  className="iconfont icon-jiarugouwuche"></a>
						</div>
						
					</a>	
					</li>
				)}) : ''	
					
				}	
				</ul>
       
      		</div>
		)
	}

	componentDidMount() {

	}

}

export default Homebottom;