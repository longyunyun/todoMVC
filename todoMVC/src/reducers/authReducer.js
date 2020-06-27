// 对authAchtions.js返回回来的定义type类型进行判断成功后再把用户数据返回至组件
import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty'

const initialState ={
    isAuthenticated:false,
    user:{}
}
// reducer接受两个参数,State,和action 作为参数,返回一个新的state
export default function(state = initialState,action){
    // 对传过来的type进行配置然后返回
    switch (action.type){
        case SET_CURRENT_USER  :
            return {//如果type类型匹配上就把最新的state赋给initialState中对应的属性,再返回至来源组件(login.js)
                ...state,//可能返回多个,所以用展开运算符
                user:action.payload,//把action下的payload更新至user
                isAuthenticated:!isEmpty(action.payload),//确认授权,为防止payload是空值所以还在判断一下
            }
        default :
        return state;
    }
}