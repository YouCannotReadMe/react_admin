import {combineReducers} from 'redux'
import loginRecuder from './login_recuder'
import menuReducer from './menu_reducer'

export default combineReducers({
    userLoginInfo: loginRecuder,
    saveMenuTitle: menuReducer

})