import {INCREMENT, DECREMENT} from './action_types'

const initState = 0
export default function operaCount(preState = initState, action){

    let {type, data} = action

    let newState
    switch(type){
        case INCREMENT:
            newState = preState + data*1
            return newState
        case DECREMENT:
            newState = preState - data*1
            return newState
        default:
            return preState
    }
}