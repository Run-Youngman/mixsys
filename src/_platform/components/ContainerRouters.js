import React, {Component} from 'react';
import {Route} from 'react-router-dom';

export default class ContainerRouters extends Component {

	render() {
		let {menus = [], containers = {}} = this.props;
		containers = containers || {};
		return (
			<div style={{height:'100%'}}>
				{this.route(menus, containers)}
			</div>);
	}

	route(menus, containers) {
		let routers = [];
		menus.forEach(menu => {
			const {key, exact, path, children = []} = menu;
			const rst = this.route(children, containers);
			routers = [...routers, ...rst];
			containers[key] && routers.push(<Route exact={exact} key={key} path={path} component={containers[key]}/>)
		});
		return routers;
	}
};
