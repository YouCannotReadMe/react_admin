import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card, Button, Form, Input, Select, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqCategoryList} from '../../api/index'
import UploadPictureWall from './upload_picture_wall'
import RichTextEdite from './rich_text_edite'
import {reqAddProduct, reqProductInfoById, reqUpdateProduct} from '../../api/index'
const {Item} = Form
const {Option} = Select

class AddUpdate extends Component{

    state = {
        categoryList: [],
        opareType: '',
        name: '',
        desc: '',
        categoryId: '',
        price: '',
        detail: '',
        imgs: [],
        _id: ''
    }

    myUpload = React.createRef()

    componentDidMount(){
        const {id} = this.props.match.params
        const pList = this.props.getSaveProduct

        let categoryList = this.props.getSaveCategoryList
        if(categoryList instanceof Array){
            this.setState({categoryList})
        }
        else this.getCategoryList()

        if(id){
            this.setState({opareType: 'update'})
            if(pList instanceof Array){
                let result = pList.find((item) => {
                    return item._id === id
                })
                this.setState({...result},() => {
                    const {name, price, categoryId, desc} = this.state
                    this.myFrom.setFieldsValue({
                        name: name,
                        price: price,
                        categoryId: categoryId,
                        desc: desc,
                    })
                })
                this.myUpload.current.setFileList(result.imgs)
                this.myRichText.setRichText(result.detail)
                console.log(result);
            }
            else this.getProduct(id)
        }

    }

    getProduct = async(id) => {
        let {data, status} = await reqProductInfoById(id)
        if(status === 0){
            this.setState({...data},() => {
                const {name, price, categoryId, desc} = this.state
                this.myFrom.setFieldsValue({
                    name: name,
                    price: price,
                    categoryId: categoryId,
                    desc: desc,
                })
            })
            this.myUpload.current.setFileList(data.imgs)
            this.myRichText.setRichText(data.detail)
        }
        else message.error('请重新获取',1)

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
        let {_id} = this.state
        let result
        if(this.state.opareType === 'update') result = await reqUpdateProduct({...value, imgs, detail, _id })
        else result = await reqAddProduct({...value, imgs, detail })
        
        let {status, data, msg} = result
        if(status === 0){
            message.success('操作成功', 1)
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
                            <span style={{fontSize: 20}}>{this.state.opareType === 'update' ? '修改商品' : '添加商品'}</span>
                        </div>
                    }
                    style={{ width: '100%' }}
               >

                    <Form 
                        onFinish={this.onFinish}
                        name="nest-messages" 
                        labelCol={{md: 2}}
                        wrapperCol={{md: 6}}
                        ref={input => this.myFrom = input}
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
    state => ({
        getSaveCategoryList: state.saveCategory.categoryList,
        getSaveProduct: state.saveProduct.product,
    }),
    {

    }
)(AddUpdate)
