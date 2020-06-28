
import {combineReducers} from 'redux';
import auth from './Auth.redux.js';
let reducer = combineReducers({
	auth: auth
})
export default reducer;
