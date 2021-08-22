import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'

const instance = axios.create({
    timeout: 4000
})

instance.interceptors.request.use(function (config) {
  //从配置对象中获取method和data
  const {method,data} = config 
  //若是post请求
  if(method.toLowerCase() === 'post'){
    //若传递过来的参数是对象，转换成urlencoded形式
    if(data instanceof Object){
      config.data = qs.stringify(data)
    }
  }
  return config;
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    message.error(error.message, 1)
    return Promise.reject(() => {});
});

export default instance