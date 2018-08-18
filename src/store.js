import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import {routerReducer} from 'react-router-redux';

const composeEnhancers = composeWithDevTools({
    //为了redux dev tools 服务
	// options like actionSanitizer, stateSanitizer
});
const middleware = [thunk];
const store = createStore(combineReducers({routering: routerReducer}),
    {},
    composeEnhancers(
        applyMiddleware(...middleware)
    ));
    
store.appReducers = {}
export const updateReducer = (key,reducer) => {
    if (Object.hasOwnProperty.call(store.appReducers, key)) return;
    store.appReducers[key] = reducer;
    store.replaceReducer(combineReducers({routering: routerReducer ,...store.appReducers}));
}
export default store;

