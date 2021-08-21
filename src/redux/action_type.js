import {INCREMENT, DECREMENT} from './action_types'

export const incrementAction = value => ({type: INCREMENT, data: value})

export const decrementAction = value => ({type: DECREMENT, data: value})