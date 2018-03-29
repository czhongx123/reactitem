import React from 'react';
import ReactDOM from 'react-dom';

import FastClick from 'fastclick'
import Es6Promise from 'es6-promise'

import './index.scss';
import App from '@/components/App';
import Detail from '@/components/Detail';
import Login from '@/components/Login';
import Register from '@/components/Register';
import registerServiceWorker from '@/registerServiceWorker';
import { BrowserRouter as Router ,Route,Switch } from 'react-router-dom';

//引入状态管理器
import store from './store/index.js'


FastClick.attach(document.body)
Es6Promise.polyfill()

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}




function render(){



ReactDOM.render(
	<ErrorBoundary>
	<Router>
		<Switch>
		
			<Route path='/detail'  component={Detail} />
			<Route path='/login'  component={Login} />
			<Route path='/register'  component={Register} />
			<Route path='/'  component={App} />
		</Switch>
	</Router>
	</ErrorBoundary>, document.getElementById('root'));
registerServiceWorker();

}

render();



//store调用render函数
store.subscribe(render)





