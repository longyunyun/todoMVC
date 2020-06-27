import { combineReducers } from 'redux'
import login from './reducers/login' //写法就是单个redux写法,每个功能写一个
 
const reducer = combineReducers({
    login
})
 
export default reducer
