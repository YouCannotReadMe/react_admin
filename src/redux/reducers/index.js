import {combineReducers} from 'redux'
import loginRecuder from './login_recuder'
import menuReducer from './menu_reducer'
import productRecuder from './product_reducer'
import categoryRecuder from './category_reducer'

export default combineReducers({
    userLoginInfo: loginRecuder,
    saveMenuTitle: menuReducer,
    saveProduct: productRecuder,
    saveCategory: categoryRecuder
})