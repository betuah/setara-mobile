import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';
import ErrorHandler from '../../constants/ErrorHandler';

export const LOAD_CLASS = 'LOAD_CLASS'
export const DETAIL_CLASS = 'DETAIL_CLASS'

export const initData = (token = 'testing token') => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/class`)
            const resData = res.data
            dispatch({type: LOAD_CLASS, listClass: resData.data})
        } catch (err) {
            ErrorHandler(err)
        }
        
    }
}

export const detailKelas = (id) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/class/${id}`)
            const resData = res.data.data

            dispatch({type: DETAIL_CLASS, detailClass: resData})
        } catch (err) {
            ErrorHandler(err)
        }
    }
}