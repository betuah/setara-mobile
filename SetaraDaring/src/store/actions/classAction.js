import Axios from 'axios';
import config from '../../constants/config';

const header  = {
    headers: {'Content-Type': 'application/json'},
    timeout: 15000
}

export const LOAD_CLASS = 'LOAD_CLASS'
export const DETAIL_CLASS = 'DETAIL_CLASS'

export const initData = (token = 'testing token') => {
    return async dispatch => {
        const res = await Axios.get(`${config.base_url}/api/v1/class`, {}, {...header, headers: {...header.headers, 'Authorization': `Bearer ${token}`}})

        if (!res) throw('Erorr')

        dispatch({type: LOAD_CLASS, listClass: res.data})
    }
}

export const detailKelas = (token = 'testing', data) => {
    return async dispatch => {
        const res = await Axios.get(`${config.base_url}/api/v1/class/${data.id_kelas}`, {}, {...header, headers: {...header.headers, 'Authorization': `Bearer ${token}`}})
        const resData = {
            details: {...data},
            ...res.data[0]
        }

        if (!res) throw('Erorr')

        dispatch({type: DETAIL_CLASS, detailClass: resData})
    }
}