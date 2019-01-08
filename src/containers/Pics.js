import { Button, Popconfirm, Table, message, Modal, Form, Divider } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddEmployee from '../components/Main/AddEmployee'
import { actions } from '../Action/login/login';
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
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picurl: '',
        };
        this.columns = [{
            title: '序号',
            width: 60,
            key: 'index',
            render: (text, record, index) => {
                return index + 1
            }
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 800,
        },{
            title: '操作',
            key: 'opt',
            width: 50,
            render: (text, record, index) => {
                return <div><a href='#' onClick={this.onViewClick.bind(this, record, index)}>查看</a>
                </div>
            }
        }]
    }

    onViewClick (record) {
        this.setState({picurl: record.thumbSrc})
    }

    componentDidMount() {
        const { getWormPic } = this.props.bindedactions;
        getWormPic();
    }

    render() {
        const array = this.props.LOGIN ? this.props.LOGIN.pics : [];
        return (
            <div className="body">
                <Table
                    columns={this.columns}
                    bordered
                    dataSource={array}
                />
                {this.state.picurl !== '' && <img src={this.state.picurl}  alt="图片"/>}
            </div>
        );
    }
}