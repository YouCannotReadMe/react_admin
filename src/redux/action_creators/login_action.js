import {USER_LOGIN_INFO, USER_LOGOUT} from '../action_types'

export const createUserLoginInfoAction = (value)=> {
    let {user, token} = value.data

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    return {type:USER_LOGIN_INFO,data:value}
}



export const createDeleteUserLoginInfoAction = ()=> {

    localStorage.removeItem('user')
    localStorage.removeItem('token')

    return {type:USER_LOGOUT}
}
