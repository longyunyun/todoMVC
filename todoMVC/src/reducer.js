// import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELECT_ITEM,INIT_LIST_ACTION} from './actionTypes'

// const defaultState = {
//     inputValue:'',
//     list:[]
// }
// //reducer可以接受state 但不可以修改state
// export default (state = defaultState,action) =>{
//     const newState = JSON.parse(JSON.stringify(state))  ;
//     switch(action.type){
//         case CHANGE_INPUT_VALUE:           
//             newState.inputValue = action.value; 
//             return newState  //返回给store

//         case ADD_TODO_ITEM:
//             newState.list.push(newState.inputValue)
//             newState.inputValue = ''
//             return newState

//         case DELECT_ITEM:
//             newState.list.splice(action.index,1)
//             return newState
//         case INIT_LIST_ACTION:
//             newState.list = action.data;
//             return newState

//         default :
//             return state
//     }
// }
import {combineReducers} from 'redux';
// import todosReducer from './todos/reducer';
import auth from './Auth.redux.js';
 
let reducer = combineReducers({//合并reducer
	// todos: todosReducer,
	auth: auth
})
export default reducer;
