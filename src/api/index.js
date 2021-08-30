import axios from './myAxios'
import {BASE_URL, PAGE_SIZE} from '../config/config'

export const reqLogin = (username, password) => axios.post(`${BASE_URL}/login`,{username, password},{})

//获取商品分类列表
export const reqCategoryList = () => axios.get(`${BASE_URL}/manage/category/list`)

//获取天气信息 axios.get(`https://qqlykm.cn/api/baidu/tq.php?city=${CITY}`) https://qqlykm.cn/api/baidu/tq.php?city=%E5%8D%97%E6%98%8C
// export const reqWeatherInfo = () => {
//     jsonp(`http://localhost:8080/maven/selectschool.do?output=json`,(err, data) => {
//         console.log(`https://qqlykm.cn/api/baidu/tq.php?city=${CITY}`);
//         console.log(err, data);

//     })
// }\

export const reqAddCategoryName = (categoryName) => axios.post(`${BASE_URL}/manage/category/add`,{categoryName})

export const reqUpateCategoryName = (categoryObj) => axios.post(`${BASE_URL}/manage/category/update`,categoryObj)

export const reqProductList = (pageNum, pageSize) => axios.get(`${BASE_URL}/manage/product/list`, {params:{pageNum, pageSize}})

export const reqUpdateProStatus = (productId, status) => axios.post(`${BASE_URL}/manage/product/updateStatus`, {productId, status})

export const reqSearchProductList = (pageNum, pageSize, searchType, keyWord) => axios.get(`${BASE_URL}/manage/product/search`, {params:{pageNum, pageSize, [searchType]:keyWord}})

export const reqProductInfoById = (id) => axios.get(`${BASE_URL}/manage/product/info`, {params:{productId: id}})

export const reqRemovePicture = (name) => axios.post(`${BASE_URL}/manage/img/delete`, {name})

export const reqAddProduct = (productObj) => axios.post(`${BASE_URL}/manage/product/add`, {...productObj})