import ErrorHandler from '../../constants/ErrorHandler';
import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';
import Axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOAD_DATA = 'LOAD_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

const header = {
    headers: {'Content-Type': 'multipart/form-data' }
}

export const initData = () => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/profile`)
            const resData = res.data

            dispatch({
                type: LOAD_DATA,
                profile: resData.data,
                settings: {}
            })
        } catch (err) {
            ErrorHandler(err)
        }
    }
}

export const updateData = data => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.put(`${config.base_url}/api/v1/profile`, { ...data })
            const resData = res.data

            dispatch({type: UPDATE_DATA, profile: resData.data})
        } catch (error) {
            console.log(error)
            ErrorHandler(error)
        }
    }
}

export const updateAvatar = (file, id) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.post(`${config.base_url}/api/v1/profile/avatar`, createFormData(file, { userId: id }))
            const resData = res.data
            
            dispatch({type: UPDATE_DATA, profile: resData.data})
        } catch (error) {
            console.log(error.response, 'profile avatar')
            ErrorHandler(error)
        }
    }
}

const createFormData = (photo) => {
    const data = new FormData();
    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    return data;
};