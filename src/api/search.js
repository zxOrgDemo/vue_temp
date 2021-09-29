import { axios } from '@/utils/request'
export function getSearch(params) {
    let url = '/web/policy/list'
    return axios.get(url, {
        params: {...params}
    })
}