import {createAction, handleActions} from 'redux-actions';
import {createAsyncAction} from '../createFetchAction';
const setLoginData = createAction('登录action');
const setLoginData1 = createAction('测试action');
const getAllEmployeeOk =  createAction('得到所有用户');
const getAllEmployee  = createAsyncAction('http://localhost:8080/tabledata','GET',getAllEmployeeOk);

const createEmployee = createAsyncAction('http://localhost:8080/createEmployee','POST');
const updateEmployee = createAsyncAction('http://localhost:8080/updateEmployee?name={{name}}','PUT');
const deleteEmployee = createAsyncAction('http://localhost:8080/deleteEmployee?name={{name}}','DELETE');

export const actions = {
    setLoginData,
    setLoginData1,
    getAllEmployee,
    getAllEmployeeOk,
    createEmployee,
    updateEmployee,
    deleteEmployee
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
    }
},{});