import React, { Component } from 'react'
import {Card, Button, Table, Modal, Form, Input} from 'antd'
import {reqCategoryList} from '../../api/index'


export default class Category extends Component{

    state = {
        categoryList: [],
        loading: true,
        visible: false

    }

    componentDidMount(){
        this.getCategoryList()
    }

    getCategoryList = async() => {
        let categoryList = await reqCategoryList()
        this.setState({loading: false})
        let {status, data} = categoryList
        if(status === 0) this.setState({categoryList: data })
    }


    showModal = () => {
        console.log("点了新增")
        this.setState({visible: true})
    };
  
    handleOk = () => {
        
        this.setState({visible: false})
    };
  
    handleCancel = () => {
        this.setState({visible: false})
    };


    
    render(){
        const dataSource = this.state.categoryList
          
          const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              align: 'center',
            },
            {
              title: '操作',
              key: 'address',
              align: 'center',
              render: (text, record) => (
                <Button type="link">修改</Button>
              )

            },
          ];

        return (
            <div>
                <Card extra={<Button type="primary" onClick={()=>{this.showModal()}}>新增</Button>} style={{ width: '100%' }}>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        size="small" 
                        bordered
                        rowKey="_id"
                        pagination={{position: ['bottomCenter'], pageSize: 5}}
                        loading={this.state.loading}
                    />
                </Card>
                <Modal 
                    title="添加分类" 
                    cancelText="取消"
                    okText="确定"
                    visible={this.state.visible} 
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        // initialValues={{
                        //     remember: false,
                        // }}
                        onFinish={this.handleOk}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '类名必须输入',
                                },
                            
                            ]}
                        >
                            <Input placeholder="请输入类名" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}