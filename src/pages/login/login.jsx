import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import './css/login.less'

export default class Login extends Component {
    onFinish = (value) => {
        console.log(value);
    }

    render() {
        return (
            <div className="login">
                <header>
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </header>
                <section>
                    <h2>管理员登录</h2>
                    <Form
                    name="normal_login"
                    className="login-form"
                    // initialValues={{
                    //     remember: false,
                    // }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '用户名必须输入',
                            },
                            {
                                max: 12,
                                message: '必须为12位以下',
                            },
                            {
                                min: 5,
                                message: '必须为5位以上',
                            },
                            {
                                pattern: /^\w+$/,
                                message: '只能由英文，下划线，数字组成',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" style={{color: 'gray'}} />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                validator: (rule, value) => {
                                    if(!value){
                                        return Promise.reject(new Error('密码不能为空'))
                                    }else if(value.length < 5) {
                                        return Promise.reject(new Error('密码必须为5位以上'))
                                    }else if(value.length > 12){
                                        return Promise.reject(new Error('密码必须小于12位'))
                                    }else if(!(/^\w+$/).test(value)){
                                        return Promise.reject(new Error('只能由英文，下划线，数字组成'))
                                    }else{
                                        return Promise.resolve()
                                    }
                                }
                                   
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" style={{color: 'gray'}} />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            登录
                        </Button>
                    
                    </Form.Item>
                </Form>
            
                </section>
            </div>
            
        )
    }
}