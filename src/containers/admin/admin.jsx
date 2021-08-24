import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createDeleteUserLoginInfoAction} from '../../redux/action_creators/login_action'

@connect(
    state => ({userLoginInfo:state.userLoginInfo}),
    {
        deleteUserLoginInfo:createDeleteUserLoginInfoAction
    }
)
class Admin extends Component{
    componentDidMount(){
        // console.log(this.props);
    }

    logout = () => {
       this.props.deleteUserLoginInfo()
    }

    render(){
        let {isLogin, user} = this.props.userLoginInfo
        if(!isLogin){
            return <Redirect to='/login'/>
        }else{
            // const {username} = JSON.parse(localStorage.getItem('user'))
            
            return (
                <div>
                    <h1>欢迎--{user.username}</h1>
                    <button onClick={this.logout}>退出登录</button>
                </div>
                
            )
        }

      
    }
}

export default Admin