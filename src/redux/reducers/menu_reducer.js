import {MENU_TITLE} from '../action_types'
let initState = {
   title: ''
}
export default function loginRecuder(preState=initState, action){
    const {type, data} = action
    let newState
    switch (type) {
        case MENU_TITLE:
            newState = {
                title: data
            }
            return newState
        
        default:
            return preState
    }
}