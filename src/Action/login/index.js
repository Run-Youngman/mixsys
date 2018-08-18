import {handleActions, combineActions} from 'redux-actions';
import loginReducer,{actions} from'./login';
import {getValuesFromObj} from '../../util';

export default handleActions({
    [combineActions(...getValuesFromObj(actions))]:(state = {},action)=>{
        return {
            ...state,...loginReducer(state,action)
        }
    }
},{});