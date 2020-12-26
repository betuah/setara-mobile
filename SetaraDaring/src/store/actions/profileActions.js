import ErrorHandler from '../../constants/ErrorHandler';
import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOAD_DATA = 'LOAD_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const RESET_PASS = 'RESET_PASS';

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

            const itemData = await AsyncStorage.getItem('userData')
            const userData = JSON.parse(itemData)

            await saveData(
                userData.accessToken, 
                userData.refreshToken, 
                userData.userId, 
                userData.username, 
                resData.data.name, 
                resData.data.picture,
                userData.role,
                resData.data.sekolah,
                userData.status,
            )

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

            const itemData = await AsyncStorage.getItem('userData')
            const userData = JSON.parse(itemData)

            await saveData(
                userData.accessToken, 
                userData.refreshToken, 
                userData.userId, 
                userData.username, 
                userData.fullName, 
                resData.data.picture,
                userData.role,
                userData.sekolah,
                userData.status,
            )
            
            dispatch({type: UPDATE_DATA, profile: resData.data})
        } catch (error) {
            console.log(error.response, 'profile avatar')
            ErrorHandler(error)
        }
    }
}

export const feedback = (data) => {
    return async dispatch => {
        try {
            await AxiosAPI.post(`${config.base_url}/api/v1/user/feedback`, { ...data })
        } catch (error) {
            console.log(error.response, 'feedback error')
            ErrorHandler(error)
        }
    }
}

export const report = (data) => {
    return async dispatch => {
        try {
            await AxiosAPI.post(`${config.base_url}/api/v1/user/report`, { ...data })
        } catch (error) {
            console.log(error.response, 'report error')
            ErrorHandler(error)
        }
    }
}

export const resetPass = (data) => {
    return async dispatch => {
        try {
            await AxiosAPI.put(`${config.base_url}/api/v1/user/resetPass`, { ...data })
        
            dispatch({type: RESET_PASS})
        } catch (error) {
            console.log(error.response, 'pass error')
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

const saveData = async (token, refToken, userId, username, fullName, picture, role, sekolah, status) => {
    try {
        return await AsyncStorage.setItem('userData', JSON.stringify({token, refToken, userId, username, fullName, foto: picture, role: role, sekolah: sekolah, status: status}))
    } catch (error) {
        console.log(error)
        throw (error)
    }
}