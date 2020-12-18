import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';
import ErrorHandler from '../../constants/ErrorHandler';

export const READ = 'READ';
export const LOAD_NOTIF = 'LOAD_NOTIF';

export const initData = () => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/notification`)
            const resData = res.data

            dispatch({type: LOAD_NOTIF, notif: resData.data})
        } catch (err) {
            ErrorHandler(err)
        }
    }
}

export const read = idNotif => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.put(`${config.base_url}/api/v1/notification`, { id: idNotif })
            const resData = res.data

            dispatch({type: READ, notif: resData.data})
        } catch (err) {
            ErrorHandler(err)
        }
    }
}