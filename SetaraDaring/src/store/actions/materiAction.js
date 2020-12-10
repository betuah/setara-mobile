import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';
import ErrorHandler from '../../constants/ErrorHandler';

export const LOAD_MATERI = 'LOAD_MATERI'
export const DETAIL_MATERI = 'DETAIL_MATERI'

export const loadListMateri = (id_mapel) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/materi/${id_mapel}`)
            const resData = res.data
            
            dispatch({type: LOAD_MATERI, listMateri: resData.data})
        } catch (error) {
            ErrorHandler(error)
        }
        
    }
}

export const getDetailMateri = (id_modul) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/materi/detail/${id_modul}`)
            const resData = res.data

            dispatch({type: DETAIL_MATERI, detailMateri: resData})
        } catch (error) {
            console.log(error, 'error action')
            ErrorHandler(error)
        }
    }
}