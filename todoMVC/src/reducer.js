
import {combineReducers} from 'redux';
// import todosReducer from './todos/reducer';
import auth from './Auth.redux.js';
 
let reducer = combineReducers({//合并reducer
	// todos: todosReducer,
	auth: auth
})
export default reducer;
