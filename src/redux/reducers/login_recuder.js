import {USER_LOGIN_INFO, USER_LOGOUT} from '../action_types'

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')

let initState = {
    user: user || {} ,
    token: token || '',
    isLogin: user && token ? true : false
}
export default function loginRecuder(preState=initState, action){
    const {type, data} = action
    let newState
    switch (type) {
        case USER_LOGIN_INFO:
            newState = {
                user: data.data.user,
                token: data.data.token,
                isLogin: true
            }
            return newState
        case USER_LOGOUT:
            return {user: {}, token: '', isLogin: false}
        
        default:
            return preState
    }
}