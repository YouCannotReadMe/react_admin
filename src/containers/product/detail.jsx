import React, { Component } from 'react'
import { List, Button, message } from 'antd'
import {connect} from 'react-redux'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqProductInfoById, reqCategoryList} from '../../api/index'
import './detail.less'

const {Item} = List

class Detail extends Component{
    state = {
        categoryId:'',
        categoryName:'',
        desc:'',
        detail:'',
        imgs:[],
        name:'',
        price:'',
    }

    componentDidMount(){
        const _id = this.props.match.params.id

        const pList = this.props.getSaveProduct
        if(pList instanceof Array){
            let result = pList.find((item) => {
                return item._id === _id
                
            })
            if(result){
                this.categoryId = result.categoryId
                this.setState({...result})
            }
        }else{
            this.getProductInfoById(_id)
        }

        let cList = this.props.getSaveCategory
        if(cList instanceof Array){
            let cate = cList.find((item) =>{
                return item._id === this.categoryId
            })
            this.setState({categoryName: cate.name})
        }
        
        this.getCategoryList()
    }

    getCategoryList = async () => {

        let {data, status} =  await reqCategoryList()
        if(status === 0){
            let cate = data.find((item) => {
                return item._id === this.categoryId
            })
            this.setState({categoryName: cate.name})
        }else{
            message.error('加载失败', 1)
        }

    }

    getProductInfoById = async(id) => {
        let {status, data} = await reqProductInfoById(id)
        if(status === 0){
            this.categoryId = data.categoryId
            this.setState({...data})
        }else{
            message.error('加载错误',1)
        }
    }


    render(){
      
        return (
            <div className="prod-detail">
                
                <List
                    
                    header={
                        <div className="header"> 
                            <Button type="link" onClick={() => {this.props.history.goBack()}}>
                                <ArrowLeftOutlined style={{fontSize: 25}}/>
                            </Button> 
                            <span >商品详情</span>
                        </div>}
                    bordered
                >

                    <Item>
                        <div>
                            <span className="prod-name">商品名称：</span>
                            <span>{this.state.name}</span>
                        </div>
                    </Item>
                    <Item>
                       <div>
                            <span className="prod-name">商品描述：</span>
                            <span>{this.state.desc}</span>
                       </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="prod-name">商品价格：</span>
                            <span>{this.state.price}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="prod-name">商品分类：</span>
                            <span>{this.state.categoryName}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="prod-name">商品图片：</span>
                            {
                                this.state.imgs.map((item, index)=>{
                                    return <img src={`/upload/`+item} alt="商品图片" key={index}/>
                                })
                            }
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="prod-name">商品详情：</span>
                            <span dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
                        </div>
                    </Item>

                </List>
            </div>
        )
    }
}

export default connect(
    state => ({
        getSaveProduct: state.saveProduct.product,
        getSaveCategory: state.saveCategory.categoryList
    }),
    {
        
    }
)(Detail)