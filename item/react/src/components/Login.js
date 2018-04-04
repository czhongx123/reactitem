import React, {
	Component
} from 'react';
import { Link } from 'react-router-dom'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

import Header from "./Header.js"
import ajax from '@/tool/ajax_fetch.js'
import { Toast } from 'antd-mobile';
import './login.scss'

class Login extends Component {

	state = {
		phonestate: false,
		passwordstate: false,
		loginstate: 'nologin',
		phonereg: "",
		passwordreg: '',
		phone0: false,
		phonevalue: '',
		passwordvalue: ''
	}

	phoneinput(event) {
		this.setState({
			phonevalue: event.target.value
		})

		var phone1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ig;
		if(event.target.value.match(phone1)) {

			this.setState({
				phonestate: true,
				phonereg: 'iconfont icon-dui'
			}, () => {
				this.inputstate()
			})

		} else {

			this.setState({
				phonestate: false,
				phonereg: "iconfont icon-cuo"
			}, () => {
				this.inputstate()

			})

		}

	}

	passwordinput(event) {

		this.setState({
			passwordvalue: event.target.value
		}, () => {

		})

		var psd1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/ig;

		if(event.target.value.match(psd1)) {

			this.setState({
				passwordstate: true,
				passwordreg: 'iconfont icon-dui'
			}, () => {
				this.inputstate()
			})

		} else {

			this.setState({
				passwordstate: false,
				passwordreg: "iconfont icon-cuo"
			}, () => {
				this.inputstate()
			})

		}

	}

	//清空输入值
	emptyvalue(type) {
		switch(type) {
			case "phone":
				this.setState({
					phonevalue: '',
					loginstate: 'nologin'
				})

				break;
			default:
				this.setState({
					passwordvalue: '',
					loginstate: 'nologin'
				})
				break;
		}

	}

	//判定是否可以登录
	inputstate() {

		if(this.state.phonestate && this.state.passwordstate) {

			this.setState({
				loginstate: "islogin"

			})

		} else {
			this.setState({
				loginstate: "nologin"

			})

		}

	}

	//点击登录
	tologin() {

		if(this.state.loginstate == "islogin") {


			var obj = {
				user: this.state.phonevalue,
				password: this.state.passwordvalue
			}
			
//开始传递数据
			
		ajax({
			method:"get",
			data:obj,
			url:"http://localhost:3000/api/product/login",
			success:function(data){
				if(data=="1"){
					
					localStorage.setItem("user",this.state.phonevalue)
					
  					Toast.success('登录成功', 1);

					window.location.href='/home'
				}else{
					Toast.fail('用户名或密码错误', 1)
					
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
       	<div className='login'>
       		<Header titcon="登录" />
       		<img src='http://m.3songshu.com/resources/images/login-pwd-blur.f31143be.png' alt=""   />
       		
       			<div className='loginifo'>
		       			<p className='user'>
		       				<span className='iconfont icon-denglu'></span>
		       				<input onChange={this.phoneinput.bind(this)}  type='text' placeholder="手机号" value={this.state.phonevalue} />
		       				<span onClick={this.emptyvalue.bind(this,'phone')} className={this.state.phonereg}></span>
		       			</p>
       					<p  className='psd'>
		       				<span  className='iconfont icon-denglushimima'></span>
		       				<input onChange={this.passwordinput.bind(this)} value={this.state.passwordvalue} type='password' placeholder="请输入密码" />
		       				<span onClick={this.emptyvalue.bind(this,'password')} className={this.state.passwordreg}></span>
		       			</p>
       			</div>
       			
       			<div className='loginaction'>
	
       					<div >
       						<button onClick={this.tologin.bind(this)} className={this.state.loginstate}>登录</button>
       					</div>

       					<p>
       						<Link to ='/register'>快速注册</Link>
       						<Link to ='/resetpsd'>忘记密码</Link>
       					</p>
       					
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