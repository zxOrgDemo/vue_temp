import { axios } from '@/utils/request'

export function submitOpinion(param ) {
    let url = '/web/policy/submitFeedback'

    return axios.post(url , {
        ...param
    })

}