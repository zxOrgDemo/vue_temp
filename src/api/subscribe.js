import { axios } from '@/utils/request'
export function setTags(params) {
    let url = '/web/userPolicy/subscribe'
    return axios.post(url, {
        ...params
    })
}

export function getTags() {
    let url = '/web/userPolicy/getPolicySubscriptionParam'
    return axios.post(url)
}


export function getMyCollect() {
    let url = '/web/userPolicy/myFavorite'
    return axios.get(url)
}