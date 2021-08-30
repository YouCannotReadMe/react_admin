import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card, Button, Form, Input, Select, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqCategoryList} from '../../api/index'
import UploadPictureWall from './upload_picture_wall'
import RichTextEdite from './rich_text_edite'
import {reqAddProduct} from '../../api/index'
const {Item} = Form
const {Option} = Select

class AddUpdate extends Component{

    state = {
        categoryList: []
    }

    myUpload = React.createRef()

    componentDidMount(){
        let categoryList = this.props.getSaveCategoryList
        if(categoryList instanceof Array){
            this.setState({categoryList})
        }
        else this.getCategoryList()

    }

    getCategoryList = async() => {
        let {data, status} = await reqCategoryList()
        if(status === 0){
            this.setState({categoryList: data})
        }
        else message.error('请重新获取',1)
    }

    onFinish = async(value) => {

        let imgs = this.myUpload.current.getImgsNameArr()
        let detail = this.myRichText.getRichText()
        let {status, data, msg} = await reqAddProduct({...value, imgs, detail })
        if(status === 0){
            message.success('添加成功', 1)
            this.props.history.replace('/admin/prod_about/product')
        }
        else message.error(msg, 1)
    }

    render(){
        console.log();
        return (
            <div>

                <Card 
                    title={
                        <div>
                            <Button type="link" onClick={() => {this.props.history.goBack()}}>
                                <ArrowLeftOutlined style={{fontSize: 25}}/>
                            </Button> 
                            <span style={{fontSize: 20}}>添加商品</span>
                        </div>
                    }
                    style={{ width: '100%' }}
               >

                    <Form 
                        onFinish={this.onFinish}
                        name="nest-messages" 
                        labelCol={{md: 2}}
                        wrapperCol={{md: 6}}
                    >
                        <Item
                            name="name"
                            label="商品名称"
                            rules={[
                            {
                                required: true,
                                message: '必须输入'
                            },
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item
                            name="desc"
                            label="商品描述"
                            rules={[
                            {
                                required: true,
                                message: '必须输入'
                            },
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item
                            name="price"
                            label="商品价格"
                            rules={[
                            {
                                required: true,
                                message: '必须输入'
                            },
                            ]}
                        >
                            <Input type="number" prefix='￥' addonAfter='元'/>
                        </Item>
                        <Item
                            name="categoryId"
                            label="商品分类"
                           
                            rules={[
                            {
                                required: true,
                                message: '必须请选择'
                            },
                            ]}
                        >
                             <Select
                                style={{ width: '100%' }}
                                placeholder='请选择'
                            >
                                {
                                    this.state.categoryList.map((item) => {
                                        return (
                                            <Option value={item._id} key={item._id}>{item.name}</Option>
                                        )
                                    })
                                }

                                
                            </Select>
                        </Item>
                        <Item
                            label="商品图片"
                            wrapperCol={{md:10}}
                            rules={[
                            {
                                required: true
                            },
                            ]}
                            
                        >
                            <UploadPictureWall ref={this.myUpload}/>
                        </Item>
                        <Item
                            wrapperCol={{md:15}}
                            label="商品详情"
                            rules={[
                            {
                                type: 'email',
                            },
                            ]}
                        >
                            <RichTextEdite ref={input => this.myRichText = input}/>
                        </Item>
                        <Item 
                            
                        >
                            <Button type="primary" htmlType="submit" style={{marginLeft: 35}}>
                            提交
                            </Button>
                        </Item>
                    </Form>
                    
                </Card>
            </div>
        )
    }
}
export default connect(
    state => ({getSaveCategoryList: state.saveCategory.categoryList}),
    {

    }
)(AddUpdate)
