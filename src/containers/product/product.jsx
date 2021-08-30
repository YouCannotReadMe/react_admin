import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card, Button, Select, Input, Table, message} from 'antd'
import { reqUpdateProStatus, reqSearchProductList} from '../../api/index'
import {PAGE_SIZE} from '../../config/config'
import {createSaveProductAction} from '../../redux/action_creators/product_action'
const {Option} = Select
const {Search} = Input

class Product extends Component{

    state = {
        productList: [],
        total: 0,
        searchType: 'productName',

    }


    componentDidMount(){
        this.getProductList()
        
    }

    getProductList = async(pageNum = 1) => {
        console.log(this.keyWord+"keywor");
        let keyWord = this.keyWord

        let result 
        if(!keyWord) keyWord = ''
        result = await reqSearchProductList(pageNum, PAGE_SIZE, this.state.searchType, keyWord )
        console.log(result);
        let {data, status} = result
        if(status === 0) {
            this.setState({productList: data.list, total: data.total})
            this.props.saveProduct(data.list)
        }
        else message.error('获取商品失败', 1)

        // await reqSearchProductList(pageNum, PAGE_SIZE, )
        // // let {data, status} = await reqProductList(pageNum, PAGE_SIZE)
        // console.log(data)
        // if(status === 0) {
        //     this.setState({productList: data.list, total: data.total})
        // }else{
        //     message.error('获取商品失败', 1)
        // }


        
    }


    updateProStatus = async({_id, status}) => {
        console.log(_id, status);
        if(status === 1) status = 2
        else status = 1
        let pro = await reqUpdateProStatus(_id, status)
        if(pro.status === 0){
            message.success('更新商品成功', 1)
            let productList = [...this.state.productList]
            productList = productList.map((item) => {
                if(item._id === _id){
                    item.status = status
                }

                return item
            })
            this.setState({productList})
        }else{
            message.error('更新失败', 1)
        }
    }



    onSearch = value => {
        this.keyWord = value
        this.getProductList()
    }

    render(){

        const dataSource = this.state.productList
          
          const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
              width: '15%',
            
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
              width: '45%',
              align: 'center'
            },
            {
              title: '价格',
              dataIndex: 'price',
              key: 'price',
              align: 'center',
              render: (price) => (
                <span>￥ {price}</span>
              )
            },
            {
                title: '状态',
                align: 'center',
                render: (item) => (
                    <div>
                        <Button 
                            type={item.status === 1 ? 'danger' : 'primary'}
                            onClick={() => {this.updateProStatus(item)}}
                        >
                            {item.status === 1 ? '下架' : '上架'}
                        </Button>
                        <div>{item.status === 1 ? '销售中' : '已停售'}</div>
                    </div>
                )
            },
            {
                title: '操作',
                key: 'opera',
                align: 'center',
                render: (item) => (
                    <div>
                        <Button type="link" onClick={() => {this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}}>详情</Button>
                        <br/>
                        <Button type="link" onClick={() => {this.props.history.push('/admin/prod_about/product/addUpdate')}}>修改</Button>
                    </div>
                )
            },
          ];
          
          

        return (
            <div>
               <Card 
                    title={
                        <div>
                        <Select defaultValue="productName" style={{ width: '10%' }} onChange={value => {this.setState({searchType: value})}}>
                            <Option value="productName">按名称查询</Option>
                            <Option value="productDesc">按描述查询</Option>
                          
                        </Select>

                        <Search 
                            placeholder="输入关键词" 
                            style={{width: '20%', marginLeft: '5px'}} 
                            onSearch={this.onSearch} 
                            enterButton 
                            allowClear
                        />
                        </div>
                        
                    } 
                    extra={<Button type="primary" onClick={() => {this.props.history.push('/admin/prod_about/product/addUpdate')}}>新增</Button>} 
                    style={{ width: '100%' }}
               >
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        bordered
                        size='small'
                        rowKey='_id'
                        pagination={{
                            total: this.state.total,
                            position: ['bottomCenter'],
                            size: 'default',
                            pageSize: PAGE_SIZE,
                            onChange: this.getProductList
                        }}
                        
                        
                    />
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {
        saveProduct: createSaveProductAction
    }
)(Product)