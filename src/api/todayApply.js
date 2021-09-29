import { axios } from '@/utils/request'

export  function todayApply(param) {
    let url = '/web/policy/todayDeclarePolicyList/'
     return axios.get(url, {
        params : {...param}
    })
}

export  function getDetail(id, isAdmin) {
    
    let url = '/web/policy/detailByCompany/' + id
    let userInfo = sessionStorage.getItem('userInfo')
    let companyName = JSON.parse(userInfo)?.companyName
    if(!companyName) {
        let path = '/web/policy/detail/' + id
        return axios.get(path)
    }    

    let param = {
        companyName
    }
    if(isAdmin) {
         param = {
            companyName: isAdmin
        }
    } 
     return axios.get(url, {
         params: param
     })
}


export  function collect(id) {
    let url = '/web/userPolicy/favorite/' + id
     return axios.get(url)
}

export  function cancel(id) {
    let url = '/web/userPolicy/unFavorite/' + id
     return axios.get(url)
}

export function getMyCollect(param) {
    let url = '/web/userPolicy/myFavorite'
    return axios.get(url,{
        params: param
    })
}
