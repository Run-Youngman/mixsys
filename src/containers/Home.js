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
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newKey: Math.random(),
            visiable: false,
            object: {},
            currentType: 'add', // 当前弹框的类型，默认为增加员工
        };
        this.columns = [{
            title: '序号',
            width: 60,
            render: (text, record, index) => {
                return index + 1
            }
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
        }, {
            title: '年龄',
            dataIndex: 'age',
            width: 100,
        }, {
            title: '薪水',
            dataIndex: 'salary',
            width: 80,
        }, {
            title: '电话',
            dataIndex: 'phone',
            width: 200,
        }, {
            title: '操作',
            dataIndex: 'opt',
            width: 200,
            render: (text, record, index) => {
                return <div><a href='#' onClick={this.onEditClick.bind(this, record, index)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        placement='leftTop'
                        title='确定删除吗？'
                        onConfirm={this.onDeleteClick.bind(this, record)}
                        okText='确认'
                        cancelText='取消'>
                        <a>删除</a>
                    </Popconfirm>
                </div>
            }
        }]
    }

    componentDidMount() {
        const array = (this.props.LOGIN && this.props.LOGIN.employee) ? this.props.LOGIN.employee : [];
        if (array.length === 0) {
            const { getAllEmployee } = this.props.bindedactions;
            getAllEmployee();
        }
    }

    addEmployee() {
        let object = {
            name: '',
            age: '',
            salary: '',
            phone: ''
        }
        this.setState({ visiable: true, object, currentType: 'add', newKey: Math.random() })
    }

    onEditClick(record) {
        this.setState({ visiable: true, object: record, currentType: 'edit', newKey: Math.random() })
    }

    onDeleteClick(record) {
        const { deleteEmployee, getAllEmployee } = this.props.bindedactions;
        deleteEmployee({ name: record.name }).then(rst => {
            if (rst.ok && rst.ok === 1) {
                message.info('删除成功');
                getAllEmployee();
            } else {
                message.error('删除失败');
            }
        })
    }

    _goCancell() {
        this.setState({ visiable: false })
    }

    _onOkClick() {
        this.props.form.validateFields((err, values) => {
            const { currentType, object } = this.state;
            const { createEmployee, getAllEmployee, updateEmployee } = this.props.bindedactions;
            let obj = {
                name: values.name,
                age: values.age,
                password: values.password,
                salary: values.salary,
                phone: values.phone
            }
            if (currentType === 'add') {
                createEmployee({}, obj).then(rst => {
                    if (rst.error) {
                        message.error('新增员工失败')
                    } else {
                        message.info('新增员工成功');
                        this.setState({ visiable: false })
                        getAllEmployee();
                    }
                })
            } else if (currentType === 'edit') {
                updateEmployee({ name: object.name }, obj).then(rst => {
                    if (rst.ok && rst.ok === 1) {
                        message.info('更新成功');
                        getAllEmployee();
                    } else {
                        message.error('更新失败');
                    }
                    this.setState({ visiable: false })
                })
            }

        })
    }
    showPics() {
        this.setState({ visiable1: true })
    }

    render() {
        const array = (this.props.LOGIN && this.props.LOGIN.employee) ? this.props.LOGIN.employee : [];
        return (
            <div className="body">
                <Button onClick={this.addEmployee.bind(this)} type='primary' className="btn-top">添加员工</Button>
                <Table
                    columns={this.columns}
                    bordered
                    dataSource={array}
                />
                <Modal
                    title='添加用户'
                    width={808}
                    key={this.state.newKey}
                    visible={this.state.visiable}
                    onOk={this._onOkClick.bind(this)}
                    onCancel={this._goCancell.bind(this)}
                    maskClosable={false}
                >
                    <AddEmployee
                        form={this.props.form}
                        object={this.state.object}
                    />
                </Modal>
            </div>
        );
    }
}

const f = Form.create()(Home);
export default f;