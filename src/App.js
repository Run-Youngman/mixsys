import React, { Component } from 'react';
import './App.css';
import APP from './containers';
import reducers from './Action';
import { Provider } from 'react-redux';
import store,{updateReducer} from './store';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


class App extends Component {   

	async  componentDidMount() {
    	Object.keys(reducers).forEach(name=>{
			updateReducer(name,reducers[name]);
		});
	}

	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div style={{ width: '100%'}}>
						{/* <Route path="/:module?" component={Nav}/> */}
						<Switch>
							<Route path='/login' component={APP.LOGIN} />
							<Route path='/main' component={APP.MAIN} />
							<Route path='/page404' render={() => {
								return (<h1>404 not found</h1>);
							}} />
							<Redirect from='/' to='/login' />
						</Switch>
						{/* <Route path="/:module?" component={Footer}/> */}
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
