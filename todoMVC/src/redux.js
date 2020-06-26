const ADD = '嘻嘻'
         const REMOVE = '呵呵'
         
         // reducer
         export function counter(state = 0, action) {
             switch (action.type) {
                 case ADD:
                     return state + 1;
                 case REMOVE:
                     return state - 1;
                 default:
                     return 10;
             }
         }
         
         // action creator
         export function addgun() {
             return { type: ADD }
         }
         
         export function removegun() {
             return { type: REMOVE }
         }
         
         // 异步函数操作
         export function addgunAsync() {
             return dispatch => { // dispatch参数
                 setTimeout(() => {
                     dispatch(addgun())
                 }, 2000)
             }
         }
     
     