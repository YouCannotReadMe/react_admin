import React, { Component } from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Layout} from 'antd'
import {reqCategoryList} from '../../api/index'
import Header from './header/header'
import LeftNav from './left_nav/left_nav'
import Home from '../../component/home/home'
import Product from '../product/product'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import './css/admin.less'

const { Footer, Sider, Content } = Layout

class Admin extends Component{
    componentDidMount(){
        // console.log(this.props);
    }


    getCategoryList = async() => {
        let result = await reqCategoryList()
        console.log(result);
    }

    render(){
        let {isLogin, user} = this.props.userLoginInfo
        if(!isLogin){
            return <Redirect to='/login'/>
        }else{
            // const {username} = JSON.parse(localStorage.getItem('user'))
            
            return (
                <Layout className="admin">
                    <Sider className="sider">
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content className="content">
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/prod_about/product" component={Product}/>
                                <Route path="/admin/prod_about/category" component={Category}/>
                                <Route path="/admin/role" component={Role}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/line" component={Line}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Redirect to="/admin/home"/>
                            </Switch>
                        </Content>
                        <Footer className="footer">为了用户体验最佳，推荐使用谷歌浏览器 <button onClick={this.getCategoryList}>click me </button></Footer>
                    </Layout>
                </Layout>
                
            )
        }

      
    }
}

export default connect(
    state => ({userLoginInfo:state.userLoginInfo}),
    {
        
    }
)(Admin)