import ErrorHandler from '../../constants/ErrorHandler';
import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';

export const FEED = 'FEED'
export const LOAD_FEED = 'LOAD_FEED'

export const initData = () => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/post`)
            const resData = res.data

            dispatch({ type: LOAD_FEED, feed: resData.data })
        } catch (err) {
            ErrorHandler(err)
        }
    }
}