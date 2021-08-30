import React, { Component } from 'react'
import { Menu, Button, icon } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {createMenuTitleActive} from '../../../redux/action_creators/menu_action'
import {
    HomeOutlined,
    DatabaseOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import logo from '../../../static/imgs/logo.png'
import './left_nav.less'
import menuList from '../../../menu-config'
const { Item } = Menu

const { SubMenu } = Menu;
class LeftNav extends Component {

    creatChildren = (target) => {
        return (target.map((item) => {
            return (
                <Item key={item.key} icon={<CalendarOutlined />} onClick={() => {this.saveMenuTitle(item.title)}}>
                    <Link to={item.path}>
                        {item.title}
                    </Link>
                </Item>
            )
        }))
    }

    saveMenuTitle = (value) => {
        this.props.saveMenuTitle(value)
    }

    componentDidMount(){
        
    }

    render() {
        // let pathKey = this.props.location.pathname.split('/').reverse()
        let pathKey = this.props.location.pathname.split('/').indexOf('product')
        if(pathKey !== -1) pathKey = 'product'
        else pathKey = this.props.location.pathname.split('/').reverse()
        return (
            <div className="left_nav">
                <div className="title">
                    <img src={logo} alt="logo" />
                    <h1>后台管理</h1>
                </div>
                <div style={{ width: '100%' }}>

                    <Menu
                        selectedKeys={pathKey}
                        defaultOpenKeys={this.props.location.pathname.split('/').reverse()}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            menuList.map((item) => {
                                if(!item.children){
                                    return (
                                        <Item key={item.key} icon={<HomeOutlined />} onClick={() => {this.saveMenuTitle(item.title)}}>
                                            <Link to={item.path}>
                                                {item.title}
                                            </Link>
                                        </Item>
                                    )
                                }else{
                                    return (
                                        <SubMenu key={item.key} icon={<DatabaseOutlined />} title={item.title}>

                                            {
                                                this.creatChildren(item.children)
                                            }

                                        </SubMenu>
                                    )
                                }
                            })
                        }
                        

                        

                    </Menu>
                </div>
            </div>

        );
    }
}

export default connect(
    state => ({}),
    {saveMenuTitle: createMenuTitleActive}
)(withRouter(LeftNav))