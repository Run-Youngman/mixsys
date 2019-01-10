import React, { Component } from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
export default class AddModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        const {
            form: { getFieldDecorator }
        } = this.props;
        return (
            <Form>
                <FormItem {...formItemLayout} label='姓名'>
                    {getFieldDecorator('name', {
                        initialValue: this.props.object.name,
                        rules: [
                            {
                                required: true,
                                message: '请输入姓名'
                            }
                        ]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='密码'>
                    {getFieldDecorator('password', {
                        initialValue: this.props.object.password,
                        rules: [
                            {
                                required: true,
                                message: '请输入密码'
                            }
                        ]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='年龄'>
                    {getFieldDecorator('age', {
                        initialValue: this.props.object.age,
                        rules: [
                            {
                                required: true,
                                message: '请输入年龄'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label='薪水'>
                    {getFieldDecorator('salary', {
                        initialValue: this.props.object.salary,
                        rules: [
                            {
                                required: true,
                                message: '请录入薪水'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label='手机号码'>
                    {getFieldDecorator('phone', {
                        initialValue: this.props.object.phone,
                        rules: [
                            {
                                required: true,
                                message: '请输入手机号码'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
            </Form>
        );
    }
}
