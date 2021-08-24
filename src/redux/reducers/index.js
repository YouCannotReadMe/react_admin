import {combineReducers} from 'redux'
import loginRecuder from './login_recuder'

export default combineReducers({
    userLoginInfo: loginRecuder
})