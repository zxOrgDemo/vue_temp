import { axios } from '@/utils/request'
/**
 * 检查企业是否已注册
*/
export function checkRegister(param = {}) {
    let url = '/web/checkCompanyCode'
    return  axios.get(url, {
        params: param
    })
} 

export function register(param = {}) { 
    let url = '/web/userRegister'
    return axios.post(url, {
        ...param
    })
 }

 export function Login(param = {}) { 
    let url = '/web/login'
    return axios.post(url, {
        ...param
    })
 }


 export function getValid(param) {
    let url = '/web/randomImage/' +param
    return  axios.get(url)
}


export function changePass(param) {
    let utl = '/web/changePassword'
    return axios.put(utl, {
        ...param
    })
}

