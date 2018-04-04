import React, { Component } from 'react';
import Login from '@/components/Login.js'
class User extends Component {
  
	state = {
    
  }
  
  	
  	

  	
  
	  render() {
	    if(localStorage.getItem('user')){
	    	return(
  					<Login />
  			)
	    }else{
	    	
		    return (
		      <div className="box">
		        <header>
		        </header>
		        <div className = "content">
		        		我的
		        </div>
		      </div>
		    )
	  }
  }
  componentDidMount() {
    
  }
  
}

export default User;