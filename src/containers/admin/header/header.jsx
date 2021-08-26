import React, { Component } from 'react'
import {FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import {Button, Modal} from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'
import {createDeleteUserLoginInfoAction} from '../../../redux/action_creators/login_action'
import menuConfig from '../../../menu-config'
import './css/header.less'
const { confirm } = Modal;

class Header extends Component{

    state = {
        isScreenfull: false,
        date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
        title: ''
    }

    // reqWeatherInfo = async() => {
    //     let result = await reqWeatherInfo()
    //     return result
    // }

    componentDidMount(){
        screenfull.on('change', () => {
            let isScreenfull = !this.state.isScreenfull
            this.setState({isScreenfull})
        })

        this.timeId = setInterval(() => {
            this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss') })
        }, 1000)

        // let result = this.reqWeatherInfo();
        

        this.getTitle()
        
    }

    componentWillUnmount(){
        clearInterval(this.timeId)
    }


    screenfull = () => {
        screenfull.toggle();
    }

   
    logout = () => {
        const deleteUserLoginInfo = this.props.deleteUserLoginInfo
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '是否退出登录，退出后需重新登录',
            cancelText: '取消',
            okText: '确认',
            onOk() {
                deleteUserLoginInfo()
            }
        })
        
    }

    getTitle = ()=> {
        let key = this.props.location.pathname.split('/').reverse()[0]
        let title = ''
        menuConfig.forEach((item) => {
            if(item.children instanceof Array){
                let tmp = item.children.find((child) => {
                    return child.key === key
                })
                if(tmp) title = tmp.title
            }else{
               if(item.key === key) title = item.title
            }
        })

        this.setState({title})
        
    }

    render(){
        const {isScreenfull} = this.state
        const {user} = this.props.userLoginInfo
        let week = dayjs().$W;
        return (
            <header>
                <div className="header-top">
                    <Button size="small" onClick={this.screenfull}>
                       {isScreenfull ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}
                        
                    </Button>
                    <span className="username">欢迎 &nbsp; {user.username}</span>
                    <Button type="link" style={{padding:0}} onClick={this.logout}>退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="title">
                        {this.props.menuTitle.title || this.state.title}
                    </div>
                    <div className="timeAndWeather">
                        <span className="nowTime">{this.state.date}</span>
                        <img src={`https://dss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/aladdin/img/new_weath/icon/${week}.png`} alt="天气" />
                        <span className="weatherInfo">晴</span>
                    </div>
                </div>
            </header>
        )
    }
}

export default connect(
    state => ({userLoginInfo: state.userLoginInfo, menuTitle: state.saveMenuTitle}),
    {
        deleteUserLoginInfo: createDeleteUserLoginInfoAction
    }
)(withRouter(Header))