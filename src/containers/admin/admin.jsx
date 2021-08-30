import React, { Component } from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Layout} from 'antd'
import {reqCategoryList} from '../../api/index'
import Header from './header/header'
import LeftNav from './left_nav/left_nav'
import Home from '../../component/home/home'
import Product from '../product/product'
import Detail from '../product/detail'
import AddUpdate from '../product/add_update'
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
    }


    getCategoryList = async() => {
        let result = await reqCategoryList()
        console.log(result);
    }

    render(){
        const home = this.props.location.pathname.split('/')
        let {isLogin} = this.props.userLoginInfo
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
                                <Route path="/admin/prod_about/product" component={Product} exact/>
                                <Route path="/admin/prod_about/product/detail/:id" component={Detail} exact/>
                                <Route path="/admin/prod_about/product/addUpdate" component={AddUpdate} exact/>
                                <Route path="/admin/prod_about/product/addUpdate/:id" component={AddUpdate} exact/>
                                <Route path="/admin/prod_about/category" component={Category}/>
                                <Route path="/admin/role" component={Role}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/line" component={Line}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Redirect to="/admin/home"/>
                            </Switch>
                        </Content>
                        {
                            home.indexOf('home') !== -1 ? <Footer className="footer">为了用户体验最佳，推荐使用谷歌浏览器 </Footer> : ''
                        }
                        
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