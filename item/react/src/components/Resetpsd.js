import React, {
	Component
} from 'react';
import { Link } from 'react-router-dom'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

import Header from "./Header.js"
import ajax from '@/tool/ajax_fetch.js'
import { Toast } from 'antd-mobile';
import './resetpsd.scss'

class Login extends Component {

	state = {
		phonestate: false,
		codestate: false,
		nextstate: 'nonext',
		phonereg: "",
		passwordreg: '',
		phone0: false,
		phonevalue: '',
		ifcode:'nocode',
		randcode:'',
		codetime:'',
		codetit:'获取验证码',
		resetcode:false,
		passwordstate: false,
		passwordvalue: '',		
		codevalue:'',
		nextshow:"hide",
		curshow:"",
		okstate:"nonext"
		
	}

	//判定输入的手机号
	phoneinput(event) {
		this.setState({
			phonevalue: event.target.value
		})

		var phone1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ig;
		if(event.target.value.match(phone1)) {

			this.setState({
				phonestate: true,
				phonereg: 'iconfont icon-dui',
				resetcode:true
			}, () => {
				this.inputstate();
				this.nextaction();
			})

		} else {

			this.setState({
				phonestate: false,
				phonereg: "iconfont icon-cuo",
				resetcode:false
			}, () => {
				this.inputstate();
				this.nextaction();
			})

		}
		
		
		

	}

	//获取输入的验证码
	codeinput(event){
		this.setState({
			codevalue: event.target.value
		},()=>{
			
			this.nextaction()
		})
	}
	//判定是否可以进行下一步
	nextaction(){
		
		if(this.state.codevalue==this.state.randcode && this.state.codevalue!="" && this.state.phonestate){
			
			this.setState({
				nextstate: "isnext"
			})
			
			
		}else{
			
			this.setState({
				nextstate: "nonext"
			})
			
		}		
	}
	
	//点击进行下一步
	donextaction(){
		
		if(this.state.nextstate=="isnext"){
			this.setState({
			nextshow:"show",
			curshow:"hide",
			})
		}
		
		
		
	}
	
	//判定是否完成注册
	okaction(){
		if(this.state.passwordstate){
			this.setState({
				okstate:"isnext"
			})
		}else{
			this.setState({
				okstate:"nonext"
			})
			
		}

		
	}
	//点击完成修改密码
	toregister(){
		

		
		if(this.state.okstate=="isnext"){
			if(this.state.randdom!=this.state.codevalue){
				
			
				var obj={
					phone:this.state.phonevalue,
					
					password:this.state.passwordvalue
					
				}
				
				
				ajax({
					method:"get",
					data:obj,
					url:"http://localhost:3000/api/product/resetpassword",
					success:function(data){
						console.log(data)
						if(data=="1"){
		
							Toast.success('修改成功', 1);
							window.location.href='/home'
		
						}else{
							Toast.success('该手机号未注册', 1);
							window.location.href='/register'
							
						}
						
						
						
					}
				})
				
			}else{
				Toast.success('验证码错误', 1);
				
			}
			
		}
		
		
		
	}
	
	
	


	//判定输入的密码
	passwordinput(event) {

		this.setState({
			passwordvalue: event.target.value
		}, () => {

		})

		var psd1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/ig;

		if(event.target.value.match(psd1)) {

			
			this.setState({
				passwordstate: true,
				passwordreg: 'iconfont icon-dui',
				resetcode:true
			}, () => {
				this.inputstate();
				this.okaction();
			})
			

		} else {

			this.setState({
				passwordstate: false,
				passwordreg: "iconfont icon-cuo",
				resetcode:false
				
			}, () => {
				this.inputstate();
				this.okaction();
			})
			
		

		}

	}

	//清空输入值
	emptyvalue(type) {
		switch(type) {
			case "phone":
				this.setState({
					phonevalue: '',
					ifcode: 'nocode',
					phonereg: "iconfont icon-cuo"
				})

				break;
			default:
					this.setState({
					passwordvalue: '',
					passwordreg: "iconfont icon-cuo"
				})
				break;
		}

	}

	//判定是否可以发送验证码
	inputstate() {

		if(this.state.phonestate && this.state.resetcode) {

			this.setState({
				ifcode: "iscode"

			})

		} else {
			this.setState({
				ifcode: "nocode"

			})

		}

	}
	//发送验证码后
	hadsendCode(){
		var num = 60;
			var timer = setInterval(() => {
				num--;
				this.setState({
					codetime:"("+num+")",
					codetit:'重新获取',
					resetcode:false
				})

				if(num <= 0) {
					this.setState({
					codetime:"",
					codetit:'获取验证码',
					resetcode:true
					
					})
					clearInterval(timer);
					
				}
			}, 1000)
		
	}
	
	
	//点击获取验证码
	getcode() {

		if(this.state.resetcode) {

			var random = Math.floor(Math.random() * 900000 + 100000);
			this.setState({
				randcode:random
			})
			var obj = {
				phone: this.state.phonevalue,
				code:random
			}
			console.log(random)
			
			//倒计时重新发送
			this.hadsendCode()
//开始传递数据,发送验证码
			
			ajax({
				method:"get",
				data:obj,
				url:"http://localhost:3000/api/product/getcode",
				success:function(data){
					if(data=="1"){
	
						Toast.success('发送成功', 1);
	
					}
					
					
					
				}
			})
			

			console.log('yes')
		} else {
			console.log('no')

		}

	}

	render() {
		return(
			<div className="App">
       	<div className='container'>
       	<div className='register'>
       		<Header titcon="忘记密码" />
       		
       			<div className='registerifo'>
		       			<p  className={"user"+" "+this.state.curshow} >
		       				<span >手机号</span>
		       				<input onChange={this.phoneinput.bind(this)}  type='text' placeholder="请输入手机号" value={this.state.phonevalue} />
		       				<span onClick={this.emptyvalue.bind(this,'phone')} className={this.state.phonereg}></span>
		       			</p>
		       			
		       		
		       			
		       			
       					<p  className={'code'+" "+"user"+" "+this.state.curshow}>
		       				<span>验证码</span>
		       				<input type='text' placeholder="请输入验证码" value={this.state.codevalue} onChange={this.codeinput.bind(this)}/>
		       				<span onClick={this.getcode.bind(this)} className={this.state.ifcode}>{this.state.codetit}<em>{this.state.codetime}</em></span>
		       			</p>
		       				<p >
		       				<span >新密码</span>
		       				<input onChange={this.passwordinput.bind(this)} value={this.state.passwordvalue}  type='password' placeholder="请输入密码"  />
		       				<span onClick={this.emptyvalue.bind(this,'password')} className={this.state.passwordreg}></span>
		       			</p>
       			</div>
       			
       			<div className='registeraction'>
	
       					<div >
       			
       						<button className={this.state.okstate} onClick={this.toregister.bind(this)}>确认</button>
       					</div>

       				
       					
       			</div>
       			
       			
       		
        </div>
       		
       		
        </div>
       
      </div>
		);
	}
	componentDidMount(){
		
	}
}

export default Login;