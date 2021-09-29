import axios from 'axios'
// import store from '@/store'
import { VueAxios } from './axios'
import {Modal, notification} from 'ant-design-vue'
// import { ACCESS_TOKEN } from "@/store/mutation-types"

//自动设置后台服务 baseURL (也可以手工指定写死项目名字)
// let baseDomain = window._CONFIG['domianURL'];
// let baseProject = baseDomain.substring(baseDomain.lastIndexOf("/"));
// console.log("baseDomain= ",baseDomain)
// console.log("baseProject= ",baseProject)

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/reform' : '/Zapi',
//   baseURL: baseProject, 
  timeout: 9000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
      let token = sessionStorage.getItem('token')
    let data = error.response.data
    switch (error.response.status) {
      case 403:
        notification.error({ message: '系统提示', description: '拒绝访问',duration: 4})
        break
      case 500:
        Modal.error({
          title: '数据加载出错',
          content: '很抱歉，数据加载出错，后台正在维护升级'
          
        })
        sessionStorage.clear()
        
          // window.location.reload()
        break
      case 404:
          notification.error({ message: '系统提示', description:'很抱歉，资源未找到!',duration: 4})
        break
      case 504:
        notification.error({ message: '系统提示', description: '网络超时'})
        break
      case 401:
        notification.error({ message: '系统提示', description:'未授权，请重新登录',duration: 4})
        if (token) {
        //   store.dispatch('Logout').then(() => {
        //     setTimeout(() => {
              // window.location.reload()
        //     }, 1500)
        //   })
        }
        break
      default:
        notification.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers[ 'X-Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
//   if(config.method=='get'){
//     if(config.url.indexOf("sys/dict/getDictItems")<0){
//       config.params = {
//         _t: Date.parse(new Date())/1000,
//         ...config.params
//       }
//     }
//   }
  return config
},(error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
    return response.data
  }, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}