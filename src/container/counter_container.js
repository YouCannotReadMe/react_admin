import Counter from '../component/couter'
import {incrementAction, decrementAction} from '../redux/action_type'

import {connect} from 'react-redux'

// function mapStateToProps(state){
//     return {count: state}

// }

// function mapDispatchToProps(dispatch){
//     return {
//         increment: (value) => {dispatch(incrementAction(value))},
//         decrement: (value) => {dispatch(decrementAction(value))}
//     }

// }


// export default connect(mapStateToProps, mapDispatchToProps)(Counter)
//简写方法
export default connect(
    (state)=>({count: state}), 
    {
        increment: incrementAction,
        decrement: decrementAction
    }
)(Counter)