const stateData = {
    'account': 'admin',
    'passWork':'123456'
}
const login = (state = stateData, action) => { 
    switch (action.type) { 
        case 'UPDATE_ACCOUNT':
            return Object.assign({}, state, { 'account': action.value})
        case 'UPDATE_PASSWORK':
            return Object.assign({}, state, { 'passWork': action.value })
        default:
            return state
    }
}
export default login
