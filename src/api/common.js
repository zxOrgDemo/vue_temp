import { axios } from '@/utils/request'


export function getptype() {
    let url = '/web/common/policyTypeList'
    return axios.get(url)
} 

export function getLever() {
    let url = '/web/common/policyLevelList'
    return axios.get(url)
}

export function getTag() {
    let url = '/web/common/policyTagList'
    return axios.get(url)
}

export function getPolicyType() {
    let url = '/web/common/policyTypeList'
    return axios.get(url)
}