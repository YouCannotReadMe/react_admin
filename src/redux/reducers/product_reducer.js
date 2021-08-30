import {SAVE_PRODUCT} from '../action_types'
let initState = {
   product: ''
}
export default function productRecuder(preState=initState, action){
    const {type, data} = action
    let newState
    switch (type) {
        case SAVE_PRODUCT:
            newState = {
                product: data
            }
            return newState
        
        default:
            return preState
    }
}