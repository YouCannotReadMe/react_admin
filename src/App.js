import React, { Component } from 'react'
import {incrementAction, decrementAction} from './redux/action_type'


export default class About extends Component{
  myRef = React.createRef()

  store = this.props.store

  componentDidMount(){
    console.log(this.store);
  }

  increment = () => {
    
    let value = this.myRef.current.value
    // let count = this.state.count
    // this.setState({count: count + value*1})
    this.store.dispatch(incrementAction(value))
  }

  decrement = () => {
    let value = this.myRef.current.value
    // let count = this.state.count
    // this.setState({count: count - value*1})
    this.store.dispatch(decrementAction(value))
  }

  incrementIfOdd = () => {
    let value = this.myRef.current.value
    // let count = this.state.count
    if(this.store.getState() % 2 === 1){
      this.store.dispatch(incrementAction(value))
    }
  }

  incrementAsync = () => {
    let value = this.myRef.current.value
    // let count = this.state.count
    setTimeout(() => {
      this.store.dispatch(incrementAction(value))
    }, 1000)
  }



  render(){
    // let {count} = this.state
    const count = this.store.getState()
    return (
      <div>
        <h3>当前计数为{count}</h3>
        <select ref={this.myRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>&nbsp;
      </div>
    )
  }
}