import React, { Component } from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
export default class AddModel extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount () {

    }
    render () {
        let options = [];
        this.props.users.map(item => {
            options.push(<Option value={item.name}>{item.name}</Option>)
        })
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        const {
            form: { getFieldDecorator }
        } = this.props;
        return (
            <Form>
                <FormItem {...formItemLayout} label='房间名'>
                    {getFieldDecorator('name', {
                        // initialValue: this.props.object.name,
                        rules: [
                            {
                                required: true,
                                message: '请输入房间名'
                            }
                        ]
                    })(
                        <Input />
                    )}
                    </FormItem>
                <FormItem {...formItemLayout} label='描述'>
                    {getFieldDecorator('description', {
                        // initialValue: this.props.object.age,
                        rules: [
                            {
                                required: true,
                                message: '请输入房间描述'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label='组员'>
                    {getFieldDecorator('member', {
                        // initialValue: this.props.object.salary,
                        rules: [
                            {
                                required: true,
                                message: '请选择房间人员'
                            }
                        ]
                    })(<Select mode='tags'>
                        {options}
                    </Select>)}
                </FormItem>
            </Form>
        );
    }
}
