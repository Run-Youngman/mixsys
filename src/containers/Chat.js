import { Button, Popconfirm, Table, message, Modal, Form, Divider } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
            newKey: Math.random()
        };
    }

    componentDidMount() {
        const array = (this.props.LOGIN && this.props.LOGIN.employee) ? this.props.LOGIN.employee : [];
        if (array.length === 0) {
            const { getAllEmployee } = this.props.bindedactions;
            getAllEmployee();
        }
    }

    _onOkClick () {
        this.setState({visiable: false})
    }

    _goCancell () {
        this.setState({visiable: false})
    }

    createRoom () {
        this.setState({visiable: true})
    }

    render() {
        const array = (this.props.LOGIN && this.props.LOGIN.employee) ? this.props.LOGIN.employee : [];
        return (
            <div className="body">
                <Button type='primary' onClick={this.createRoom.bind(this)}>创建房间</Button>
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