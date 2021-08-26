import axios from 'axios'
import store from '../redux/store'
import qs from 'querystring'
import {message} from 'antd'
import {createDeleteUserLoginInfoAction} from '../redux/action_creators/login_action'

const instance = axios.create({
    timeout: 4000
})

instance.interceptors.request.use(function (config) {
  const {token} = store.getState().userLoginInfo

  if(token) config.headers.Authorization = 'atguigu_' + token

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
    if(error.response.status === 401){
      store.dispatch(createDeleteUserLoginInfoAction())
      message.error('请重新登录', 1)
    }else{
      message.error('网络错误', 1)
    }
    
    return Promise.reject(() => {});
});

export default instance