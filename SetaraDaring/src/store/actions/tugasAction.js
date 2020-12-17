import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';
import ErrorHandler from '../../constants/ErrorHandler';

export const LOAD_TUGAS = 'LOAD_TUGAS'
export const DETAIL_TUGAS = 'DETAIL_TUGAS'
export const ADD_TUGAS = 'ADD_TUGAS'

export const loadListTugas = (mapelId) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/tugas/${mapelId}`)
            const resData = res.data

            dispatch({type: LOAD_TUGAS, listTugas: resData.data})
        } catch (error) {
            console.log(error, 'error tugas load')
            ErrorHandler(error)
        }
    }
}

export const getDetailTugas = (tugasId) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/tugas/detail/${tugasId}`)
            const resData = res.data

            dispatch({type: DETAIL_TUGAS, detailTugas: resData})
        } catch (error) {
            console.log(error, 'error tugas')
            ErrorHandler(error)
        }
    }
}

export const addTugas = (tugasId) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.post(`${config.base_url}/api/v1/tugas/${tugasId}`)
            const resData = res.data

            dispatch({type: ADD_TUGAS, data: resData})
        } catch (error) {
            console.log(error, 'error tugas')
            ErrorHandler(error)
        }
    }
}