import axios from './myAxios'
import {BASE_URL} from '../config/config'

export const reqLogin = (username, password) => axios.post(`${BASE_URL}/login`,{username, password},{})

//获取商品分类列表
export const reqCategoryList = () => axios.get(`${BASE_URL}/manage/category/list`)

//获取天气信息 axios.get(`https://qqlykm.cn/api/baidu/tq.php?city=${CITY}`) https://qqlykm.cn/api/baidu/tq.php?city=%E5%8D%97%E6%98%8C
// export const reqWeatherInfo = () => {
//     jsonp(`http://localhost:8080/maven/selectschool.do?output=json`,(err, data) => {
//         console.log(`https://qqlykm.cn/api/baidu/tq.php?city=${CITY}`);
//         console.log(err, data);

//     })
// }
