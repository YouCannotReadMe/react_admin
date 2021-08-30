import React, { Component } from 'react'
import {Card, Button, Table, Modal, Form, Input, message} from 'antd'
import {connect} from 'react-redux'
import {createSaveCategoryListAction} from '../../redux/action_creators/category_action'
import {reqCategoryList, reqAddCategoryName, reqUpateCategoryName} from '../../api/index'
import {PAGE_SIZE} from '../../../src/config/config'


class Category extends Component{

    state = {
        categoryList: [],
        loading: true,
        visible: false,
        operaType: '',
        modelCurrentValue: '',
        modelCurrentId: ''

    }

    myForm = React.createRef()
    

    componentDidMount(){
        this.getCategoryList()
    }

    getCategoryList = async() => {
        let categoryList = await reqCategoryList()
        this.setState({loading: false})
        let {status, data} = categoryList
        if(status === 0) {
            this.setState({categoryList: data.reverse() })
            this.props.saveCategoryList(data)
        }
    }


    showAdd = () => {
        this.setState({
            modelCurrentValue: '',
            operaType: 'add',
            modelCurrentId: '',
            visible: true,
        })
    }

    showUpdate = (text) => {
        
        const {name, _id} = text
        this.setState({
            modelCurrentValue: name,
            operaType: 'update',
            modelCurrentId: _id,
            visible: true,
        },() => {
            this.myForm.current.setFieldsValue({categoryName: this.state.modelCurrentValue})
        })
        
    }

    toAdd = async(categoryName) => {
        // let categoryName = this.myForm.current.getFieldValue("categoryName")
        let {msg, data, status} = await reqAddCategoryName(categoryName)
        if(status === 0){
            let cArr = [...this.state.categoryList]
            cArr.unshift(data)
            this.setState({categoryList: cArr, visible: false})
            this.myForm.current.resetFields()
        }
        if(status === 1) {
            message.error(msg, 1)
        }
    }

  

    toUpdate = async(categoryObj) => {
        let result = await reqUpateCategoryName(categoryObj)
        if(result.status === 0){
            message.success('修改成功', 1)
            this.getCategoryList()
            this.setState({visible: false})
            this.myForm.current.resetFields()
        }else{
            message.error(result.msg, 1)
        }

    }
  
    handleOk = () => {
        this.myForm.current.validateFields()

        .then(values => {
            if ('add' === this.state.operaType)  this.toAdd(values.categoryName)

            if ('update' === this.state.operaType){
                const categoryId = this.state.modelCurrentId
                const categoryName = values.categoryName
                const categoryObj = {categoryId, categoryName}
                this.toUpdate(categoryObj)
            }
            
        })
        .catch(err => {
            message.warn('表单输入有误，请重新输入', 1)
        })
        //this.toAdd()

    };
  
    handleCancel = () => {
        this.setState({visible: false})
        this.myForm.current.resetFields()
    };


    
    render(){
        const dataSource = this.state.categoryList
          
          const columns = [
            {
              title: '类名',
              dataIndex: 'name',
              key: 'name',
              align: 'center',
            },
            {
              title: '操作',
              key: 'address',
              align: 'center',
              render: (text) => (
                <Button type="link" onClick={() =>{ this.showUpdate(text)}}>修改</Button>
              )

            },
          ];

        return (
            <div>
                <Card extra={<Button type="primary" onClick={()=>{this.showAdd()}}>新增</Button>} style={{ width: '100%' }}>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        size="small" 
                        bordered
                        rowKey="_id"
                        pagination={{position: ['bottomCenter'], pageSize: PAGE_SIZE, showQuickJumper: true}}
                        loading={this.state.loading}
                    />
                </Card>
                <Modal 
                    title={this.state.operaType === 'add' ? '添加分类' : '修改分类'}
                    cancelText="取消"
                    okText="确定"
                    visible={this.state.visible}
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel}
                >
                    <Form
                        name="login-form"
                        className="login-form"
                        ref={this.myForm}
                    >
                        <Form.Item
                            name="categoryName"
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

export default connect(
    state => ({}),
    {
        saveCategoryList: createSaveCategoryListAction
    }
)(Category)