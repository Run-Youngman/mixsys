import { Button, Input, Form, notification, Icon } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actions} from '../Action/login/login';
import './Login.css';

const FormItem = Form.Item;

@connect(
    state => {
        return state;
    }
    ,
    dispatch => ({
        bindedactions: bindActionCreators({ ...actions }, dispatch),
    })
)
class Login extends Component {   
    constructor(props) { 
        super(props);
        this.state = {
            isPwd: true,
        };
    }

    componentDidMount () {
        const { setLoginData1 } = this.props.bindedactions;
        setLoginData1('123');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = {
                    username: values.username,
                    password: values.password
                };
            }
        });
    }

    handleClick(e) {   //是否显示明文密码
        e.preventDefault();
        this.setState({
            isPwd: !this.state.isPwd
        });
    };
    doLogin = () =>{
        this.props.form.validateFields((err,values)=>{
            if(!err){
                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json')
                myHeaders.append('Origin', 'http://localhost:3000')
                var myInit = {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify(values)
                };
                fetch('http://localhost:8080/login',myInit).then(async(rst)=>{
                    let response = await rst.json();
                    if(!response.failed && !response.error){
                        notification.success({
                            message: '系统信息',
                            description: 'login successed',
                        });
                        this.props.history.push('/main');
                    }else{
                        notification.error({
                            message: '系统信息',
                            description: response.reason,
                        });
                    }
                });
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const pwdType = this.state.isPwd ? 'password' : 'text';
        let chgTypeImg = require('./images/icon_eye1.png');
        if (this.state.isPwd) {
            chgTypeImg = require('./images/icon_eye1.png');
        } else {
            chgTypeImg = require('./images/icon_eye2.png');
        }
        return (
            <div>
            <Form onSubmit={(e) => this.handleSubmit(e)} style={{ width: '200px', margin: '100px auto' }}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input addonBefore={<Icon type="user" />}
                            placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <div>
                            <Input addonBefore={<Icon type="lock" />}
                                type={pwdType}
                                placeholder="请输入密码" />
                            <a 
                                className="btn-change-type"
                                style={{ backgroundImage: `url(${chgTypeImg})`}}
                                onClick={this.handleClick.bind(this)} 
                            >{''}</a>
                        </div>
                        )}
                </FormItem>
                <Button 
                 type="primary" 
                 onClick={()=>this.doLogin()}
                >登录</Button>
            </Form>
            </div>
        );
    }
}
const f = Form.create()(Login);
export default f;