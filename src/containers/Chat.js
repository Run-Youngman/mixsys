import { Button, message, Modal, Form, List, Input, Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { actions } from '../Action/login/login';
import AddRoom from '../components/Chat/AddRoom'
import './Home.css';

@connect(
    state => {
        return state;
    }
    ,
    dispatch => ({
        bindedactions: bindActionCreators({ ...actions }, dispatch),
    })
)
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: false,
            newKey: Math.random(),
            value: '',
            messageArray: []
        };
    }

    componentDidMount() {
        const array = (this.props.LOGIN && this.props.LOGIN.employee) ? this.props.LOGIN.employee : [];
        const roomArray = (this.props.LOGIN && this.props.LOGIN.rooms) ? this.props.LOGIN.rooms : [];
        if (array.length === 0) {
            const { getAllEmployee } = this.props.bindedactions;
            getAllEmployee();
        }
        if (roomArray.length === 0) {
            const { getAllRoom } = this.props.bindedactions;
            getAllRoom();
        }
    }

    _onOkClick() {
        this.props.form.validateFields((err, values) => {
            const { createRoom, getAllRoom } = this.props.bindedactions;
            let member = values.member.map(item => {
                return { name: item }
            })
            let obj = {
                name: values.name,
                owner: this.props.LOGIN.currentUser,
                description: values.description,
                member: member
            }
            createRoom({}, obj).then(rst => {
                if (rst.error) {
                    message.error('新增房间失败')
                    this.setState({ visiable: false })
                } else {
                    message.info('新增房间成功');
                    this.setState({ visiable: false })
                    getAllRoom();
                }
            })
        })
    }

    _goCancell() {
        this.setState({ visiable: false })
    }

    createRoom() {
        this.setState({ visiable: true, newKey: Math.random() })
    }

    clickItem(item) {
        let that = this;
        const { messageArray } = this.state;
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.socket = io.connect('http://localhost:8080', { 'force new connection': true })
        this.socket.on('open', function () {
            console.log('连接');
        })
        this.socket.emit('addUser', this.props.LOGIN.currentuser, item.name)
        this.socket.on('to' + this.props.LOGIN.currentuser, function (obj) {
            messageArray.push(obj);
            that.setState({ messageArray })
        })
        message.info(item.name)
    }
    componentWillUnmount() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    contentChange(e) {
        this.setState({ value: e.target.value })
    }
    onSendMessage(e) {
        if (this.state.value === '') {
            message.info('发送的消息不能为空')
        }
        let obj = {
            fromUser: this.props.LOGIN.currentuser,
            msg: this.state.value
        }
        this.socket.emit('sendMsg', obj)
        this.setState({ value: '' })
    }

    render() {
        const { messageArray } = this.state;
        const array = (this.props.LOGIN && this.props.LOGIN.employee) ? this.props.LOGIN.employee : [];
        const roomArray = (this.props.LOGIN && this.props.LOGIN.rooms) ? this.props.LOGIN.rooms : [];
        return (
            <div className="body">
                <Button type='primary' onClick={this.createRoom.bind(this)}>创建房间</Button>
                <Input onChange={this.contentChange.bind(this)} value={this.state.value} />
                <Button type='primary' onClick={this.onSendMessage.bind(this)}>发送消息</Button>
                <List
                    dataSource={roomArray}
                    bordered
                    style={{ width: 200 }}
                    renderItem={item => (<List.Item onClick={this.clickItem.bind(this, item)}>{item.name}</List.Item>)}
                />
                <Card>
                    <ul>
                        {
                            messageArray.map(item => {
                                if (item.fromUser === this.props.LOGIN.currentuser) {
                                    return <li><span style={{float: 'right'}}>{`${item.msg}`}</span></li>
                                } else {
                                    return <li><span>{`from~${item.fromUser}`}</span><span>{`:   ${item.msg}`}</span></li>
                                }
                                
                            })
                        }
                    </ul>
                </Card>
                <Modal
                    title='添加房间'
                    width={808}
                    key={this.state.newKey}
                    visible={this.state.visiable}
                    onOk={this._onOkClick.bind(this)}
                    onCancel={this._goCancell.bind(this)}
                    maskClosable={false}
                >
                    <AddRoom
                        form={this.props.form}
                        users={array}
                    />
                </Modal>
            </div>
        );
    }
}

const f = Form.create()(Chat);
export default f;