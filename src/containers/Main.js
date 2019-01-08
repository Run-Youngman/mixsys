import { Icon, Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Submenu } from '../_platform/components';
import {actions} from '../Action/login/login';
import Home from './Home'
import Pics from './Pics'
import Chat from './Chat'

const { Header, Content, Footer, Sider } = Layout;

@connect(
    state => {
        return state;
    }
    ,
    dispatch => ({
        bindedactions: bindActionCreators({ ...actions }, dispatch),
    })
)
export default class Main extends Component {   
    static menus = [
        {
            key: 'Home',
            id: 'home',
            path: '/main/home',
            name: '主页',
            icon: <Icon type="solution" />,
        },
        {
            key: 'Pics',
            id: 'pics',
            path: '/main/pics',
            name: '爬虫图片',
            icon: <Icon type="solution" />,
        },
        {
            key: 'chat',
            id: 'chat',
            path: '/main/chat',
            name: '聊天室',
            icon: <Icon type="solution" />,
        },
        {
            key: 'ReactRouter',
            id: 'ReactRouter',
            path: '/reactrouter',
            name: 'ReactRouter',
            icon: <Icon type="solution" />,
        },
        {
            key: 'Component',
            id: 'Component',
            path: '/component',
            name: 'Component',
            icon: <Icon type="solution" />,
        },
        {
            key: 'Schedule',
            id: 'Schedule',
            path: '/schedule',
            name: '进度模拟',
            icon: <Icon type="solution" />,
        },
        {
            key: 'Chat',
            id: 'Chat',
            path: '/chat',
            name: '聊天室',
            icon: <Icon type="solution" />,
        },
    ]
    constructor(props) { 
        super(props);
        this.state = {
        };
    }

    async componentDidMount () {
        const Containers = await import('../containers');
        this.setState({
			...Containers,
		})
    }

    
    render() {
        return (
            <Layout className="body">
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <Submenu menus={Main.menus} {...this.props} ></Submenu>
                </Sider>
                <Layout style={{marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }}><h3>Hello, my sweetie</h3></Header>
                    <Content>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center',height:'100%' }}>
                            <Switch>
                                {Home && (<Route path='/main/home' component={Home} />)}
                                {Pics && (<Route path='/main/pics' component={Pics} />)}
                                {Chat && (<Route path='/main/chat' component={Chat} />)}
                            </Switch>
                        </div>
                    </Content>
                    <Footer>Created by Run_youngman</Footer>
                </Layout>
            </Layout>
        );
    }
}