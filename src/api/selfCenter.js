import { axios } from '@/utils/request'
export function getSearch() {
    let url = '/web/userInfo'
    return axios.get(url)
}

export function getQZ() {
    let url = '/web/common/qualificationList'
    return axios.get(url)
}

export function getTy() {
    let url = '/web/common/companyTypeList'
    return axios.get(url)
}

export function getIndu() {
    let url = '/web/common/policyIndustryList'
    return axios.get(url)
}

export function editUser(param) {
    let url = '/web/editUserInfo'
    return axios.post(url,{
        ...param
    })
}

export function getPolicyParam() {
    let url = '/web/userPolicy/getPolicySubscriptionParam'
    return axios.post(url)
}