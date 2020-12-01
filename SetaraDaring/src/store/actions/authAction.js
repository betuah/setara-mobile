import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorHandler from '../../constants/ErrorHandler';
import Axios from 'axios';
import AxiosApi from '../../config/AxiosAPI';
import config from '../../config/baseUrl';

export const AUTHENTICATE = 'AUTHENTICATE';
export const ERROR = 'ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

const header  = {
    headers: {'Content-Type': 'application/json'},
    timeout: 10000
}

export const isUserSignIn = data => {
    return async dispatch => {
        const data = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(data)

        console.log('action', data)

        dispatch({
            type: AUTHENTICATE,
            token: userData.token,
            userId: userData.userId,
            username: userData.username,
            fullName: userData.fullName,
            picture: userData.picture
        })
    }
}

export const signIn = data => {
    return async dispatch => {
        const bodyRaw = { username: data.uname,password: data.password }

        try {
            const res = await Axios.post(`${config.base_url}/api/v1/signin`, bodyRaw, header)
            const resData = res.data
            
            await saveData(resData.accessToken, resData.refreshToken, resData.data.id, resData.data.username, resData.data.name, resData.data.picture)
            dispatch({
                type: AUTHENTICATE,
                token: resData.accessToken,
                refToken: resData.refreshToken,
                userId: resData.data.id,
                username: resData.data.username,
                fullName: resData.data.name,
                picture: resData.data.picture
            })
        } catch (err) {
            ErrorHandler(err)
        }
    }
}

export const signUp = data => {
    return async dispatch => {
        const bodyRaw = {
            username: data.uname,
            password: data.password,
            nama: data.name,
            email: data.email ? data.email : '',
            kode_kelas: data.kode_kelas,
            status: data.status
        }

        try {
            const res = await Axios.post(`${config.base_url}/api/v1/signup`, bodyRaw, header)
            const resData = res.data
            dispatch({
                type: AUTHENTICATE,
                token: resData.accessToken,
                refToken: resData.refreshToken,
                userId: resData.data.id,
                username: resData.data.username,
                fullName: resData.data.name,
            })
            await saveData(resData.accessToken, resData.data.id, resData.data.username, resData.data.name)
        } catch (err) {
            ErrorHandler(err).then(errRes => { throw(errRes) })
        }
    }
}

export const signOut = (forceSignOut = false) => {
    return async dispatch => {
        const data = {
            token: null,
            refToken: null,
            userId: null,
            username: null,
            fullName: null,
            picture: null,
            status: null
        }

        if (forceSignOut) {
            await deleteData()
            dispatch({
                type: SIGN_OUT,
                data: data
            })
        } else {
            try {
                await AxiosApi.post(`${config.base_url}/api/v1/signout`)
                await deleteData()
                dispatch({
                    type: SIGN_OUT,
                    data: data
                })
            } catch (err) {
                ErrorHandler(err)
            }
        }
    }
}

const saveData = async (token, refToken, userId, username, fullName, picture) => {
    try {
        return await AsyncStorage.setItem('userData', JSON.stringify({token, refToken, userId, username, fullName, picture}))
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const deleteData = async () => {
    try {
        return await AsyncStorage.clear()
    } catch (error) {
        console.log(error)
        throw (error)
    }
}