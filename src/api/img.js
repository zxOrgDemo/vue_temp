import { axios } from '@/utils/request'

export function getImg(param) {
    let url = '/web/policy/policyExplainList'
    return axios.get(url, {
        params: {...param}
    })
}