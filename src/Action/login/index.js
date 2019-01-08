import {handleActions, combineActions} from 'redux-actions';
import loginReducer,{trueActions} from'./login';
import {getValuesFromObj} from '../../util';

export default handleActions({
    [combineActions(...getValuesFromObj(trueActions))]:(state = {},action)=>{
        return {
            ...state,...loginReducer(state,action)
        }
    }
},{});