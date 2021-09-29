import { axios } from '@/utils/request'

/**
 * 获取首页数据
 * 
*/
export function getHome(param) {
    let url = '/'
   return axios.get(url,{
      params: param
   })
} 

/**
 * 智能搜索
 * 
*/
export function getSmart(params) {
   let url = '/web/policyMatch/list'
   let param = {}
   if(params.role == 'admin') {
      url = '/web/policyMatch/match'
      param = {
         companyName:  params.companyCode
      }
   }
   return axios.get(url, {
      params: param
   })
}


export function getPlicyTopic(params={}) {
   let url = '/web/policy/policyTopicList'
   return axios.get(url, {
      params
   })
}

// function getData() {
//    return new Promise(resolve => {
//       getSmart({}).then(res => {
//          commit()
//          return res
//       }).then(res => {
//          resolve(res)
//       })
//    })
// }