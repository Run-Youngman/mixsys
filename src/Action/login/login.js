import {createAction, handleActions} from 'redux-actions';
import {createAsyncAction} from '../createFetchAction';
const setLoginData = createAction('登录action');
const setLoginData1 = createAction('测试action');
const getAllEmployeeOk =  createAction('得到所有用户');
const getWormPicOK =  createAction('得到爬虫图片');
const getAllEmployee  = createAsyncAction('http://localhost:8080/tabledata','GET',getAllEmployeeOk);

const createEmployee = createAsyncAction('http://localhost:8080/createEmployee','POST');
const updateEmployee = createAsyncAction('http://localhost:8080/updateEmployee?name={{name}}','PUT');
const deleteEmployee = createAsyncAction('http://localhost:8080/deleteEmployee?name={{name}}','DELETE');
const getWormPic = createAsyncAction('http://localhost:8080/wormpic','GET',getWormPicOK);

export const actions = {
    setLoginData,
    setLoginData1,
    getAllEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getWormPic,
}
export const trueActions = {
    getAllEmployeeOk, // 这个如果忘记导出，并不能实现reducer功能，redux中会有这个方法，因为通过创建createAsyncAction已经传入，就无法通过index.js中合并到这个action
    getWormPicOK,
    setLoginData,
    setLoginData1,
}
export default handleActions({
    [setLoginData]: (state, {payload}) => ({
        loginData: payload
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
    }
},{});