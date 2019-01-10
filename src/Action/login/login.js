import {createAction, handleActions} from 'redux-actions';
import {createAsyncAction} from '../createFetchAction';
import { create } from 'domain';
const setLoginData = createAction('登录action');
const setLoginData1 = createAction('测试action');
const getAllEmployeeOk =  createAction('得到所有用户');

const getWormPicOK =  createAction('得到爬虫图片');
const setCurrentUser = createAction('设置当前登录的用户')
const getAllEmployee  = createAsyncAction('http://localhost:8080/tabledata','GET',getAllEmployeeOk);

const createEmployee = createAsyncAction('http://localhost:8080/createEmployee','POST');
const updateEmployee = createAsyncAction('http://localhost:8080/updateEmployee?name={{name}}','PUT');
const deleteEmployee = createAsyncAction('http://localhost:8080/deleteEmployee?name={{name}}','DELETE');
const getWormPic = createAsyncAction('http://localhost:8080/wormpic','GET',getWormPicOK);

const getRoomOk =  createAction('得到所有聊天室');
const getAllRoom  = createAsyncAction('http://localhost:8080/rooms','GET',getRoomOk);
const createRoom = createAsyncAction('http://localhost:8080/creatRoom','POST');

export const actions = {
    setLoginData,
    setLoginData1,
    getAllEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getWormPic,
    setCurrentUser,
    getAllRoom,
    createRoom
}
export const trueActions = {
    getAllEmployeeOk, // 这个如果忘记导出，并不能实现reducer功能，redux中会有这个方法，因为通过创建createAsyncAction已经传入，就无法通过index.js中合并到这个action
    getWormPicOK,
    setLoginData,
    setLoginData1,
    setCurrentUser,
    getRoomOk
}
export default handleActions({
    [setLoginData]: (state, {payload}) => ({
        loginData: payload
    }),
    [setCurrentUser]: (state, {payload}) => ({
        currentuser: payload
    }),
    [setLoginData1]: (state, {payload}) => ({
        loginData1: payload
    }),
    [getAllEmployeeOk]:(state,{payload})=>{
        return{
            employee:payload
        }
    },
    [getWormPicOK]:(state,{payload})=>{
        return{
            pics:payload
        }
    },
    [getRoomOk]:(state,{payload})=>{
        return{
            rooms:payload
        }
    },
},{});