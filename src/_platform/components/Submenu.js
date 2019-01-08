import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

export default class Submenu extends Component {

	render() {
		const {menus = [], defaultOpenKeys = []} = this.props;
		return (
			<Menu theme='dark' mode="inline" selectedKeys={this.selectKey()} defaultOpenKeys={defaultOpenKeys}>
				{
					menus.map(menu => {
						const {key, name, children = [],icon} = menu;
						if (children.length) {
							const rst = [];
							children.forEach(item => {
								const {key, name, path, disabled, icon, id} = item;
									rst.push(
										<Item key={key}>
											<Link onClick={e => disabled && e.preventDefault()} to={path}>
												{icon}
												{name}
											</Link>
										</Item>);
							});
							if (rst.length) {
								return <SubMenu key={key} title={<span>{icon}<span>{name}</span></span>}>
									{rst}
								</SubMenu>
							}
						} else {
							const {key, name, path, disabled, icon, id} = menu;
								return (
									<Item key={key}>
										<Link onClick={e => disabled && e.preventDefault()} to={path}>
											{icon}
											{name}
										</Link>
									</Item>)
						}
					})
				}
			</Menu>);
	}

	selectKey() {
		const {menus = [], location: {pathname = ''} = {}} = this.props;
		const selectedKeys = [];

		menus.forEach(menu => {
			const {children = []} = menu;
			if (children.length) {
				const {key = ''} = children.find(menu => menu.path === pathname) || {};
				if (key) selectedKeys.push(key);
			} else {
				if (menu.path === pathname) selectedKeys.push(menu.key);
			}
		});

		return selectedKeys;
	}
};
