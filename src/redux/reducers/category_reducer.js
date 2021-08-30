import {SAVE_CATEGORY} from '../action_types'
let initState = {
   categoryList: ''
}
export default function categoryRecuder(preState=initState, action){
    const {type, data} = action
    let newState
    switch (type) {
        case SAVE_CATEGORY:
            newState = {
                categoryList: data
            }
            return newState
        
        default:
            return preState
    }
}