import React, { Component } from 'react'

export default class Counter extends Component{
    myRef = React.createRef()

  
    // componentDidMount(){
      
    // }
  
    increment = () => {
      let value = this.myRef.current.value
      this.props.increment(value)
    }
  
    decrement = () => {
      let value = this.myRef.current.value
      this.props.decrement(value) 
    }
  
    incrementIfOdd = () => {
      let value = this.myRef.current.value
        if(this.props.count % 2 === 1) {
            this.props.increment(value)
        }
    }
  
    incrementAsync = () => {
      let value = this.myRef.current.value
      // let count = this.state.count
      setTimeout(() => {
        this.props.increment(value)
      }, 1000)
    }

    render(){
        // let {count} = this.state
        return (
          <div>
            <h3>当前计数为{this.props.count}</h3>
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