import ErrorHandler from '../../constants/ErrorHandler';
import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';

export const FEED = 'FEED'
export const LOAD_FEED = 'LOAD_FEED'
export const LOAD_CLASS_FEED = 'LOAD_CLASS_FEED'
export const DETAIL_FEED = 'DETAIL_FEED'

export const initData = () => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/post`)
            const resData = res.data

            dispatch({ type: LOAD_FEED, feed: resData.data })
        } catch (err) {
            console.log(err)
            ErrorHandler(err)
        }
    }
}

export const postClass = classId => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/post/class/${classId}`)
            const resData = res.data

            dispatch({ type: LOAD_CLASS_FEED, feedClass: resData.data })
        } catch (error) {
            console.log(error)
            ErrorHandler(error)
        }
    }
}

export const postDetail = postId => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/post/detail/${postId}`)
            const resData = res.data

            dispatch({ type: DETAIL_FEED, detailFeed: resData.data })
        } catch (error) {
            console.log(error)
            ErrorHandler(error)
        }
    }
}
