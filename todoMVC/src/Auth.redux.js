const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const init = {
    isAuth:false,
}

//reducer
export default function auth(state = init ,action){ 
    console.log('auth.redux.js里的 state ： ' + JSON.stringify(state))
    console.log('auth.redux.js里的 action ： ' + JSON.stringify(action))
    switch(action.type){
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
          
            return {...state,isAuth:false}
        default :
            return state
    }
}


//action
export function login(){
    return {type:LOGIN}
}

export function logout(){
      //清空缓存 
      localStorage.clear()
    return {type:LOGOUT}
}


