import React, { Component } from 'react'
import {Button, Input} from 'antd'
import 'antd/dist/antd.less'
import {Route, Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class About extends Component{
  render(){
    return (
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
      </Switch>
      
    )
  }
}