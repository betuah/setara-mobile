import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import config from '../../constants/config';

export const AUTHENTICATE = 'AUTHENTICATE';
export const ERROR = 'ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SIGN_UP = 'SIGN_UP';

const header  = {
    headers: {'Content-Type': 'application/json'},
    timeout: 15000
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
            fullName: userData.fullName
        })
    }
}

export const signIn = data => {
    return async dispatch => {
        const bodyRaw = {username: data.uname,password: data.password}
        try {
            const res = await Axios.post(`${config.base_url}/api/v1/signin`, bodyRaw, header)
            const resData = res.data
            dispatch({
                type: AUTHENTICATE,
                token: resData.accessToken,
                refToken: resData.refreshToken,
                userId: resData.data.id,
                username: resData.data.username,
                fullName: resData.data.name
            })
            await saveData(resData.accessToken, resData.data.id, resData.data.username, resData.data.name)
        } catch (err) {
            const errRes = err.response ? err.response.data : false
            if (errRes) {
                if (errRes.code === 'ERR_INCORRECT_USER_PASS') {
                    throw ('Sepertinya username atau password kamu ada yang salah.')
                } else if (errRes.message) {
                    throw (errRes.message)
                } else {
                    throw ('Sepertinya kamu tidak terhubung ke Server. Periksa kembali jaringan internet kamu ya.')
                }
            }
            throw ('Sepertinya kamu tidak terhubung ke Server. Periksa kembali jaringan internet kamu ya.')
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
            const errRes = err.response ? err.response.data : false

            if (errRes.code) {
                switch (errRes.code) {
                    case 'INCORRECT_USER_PASS':
                        throw ('Sepertinya username atau password kamu ada yang salah. Coba lagi dengan teliti ya.')
                    case 'ERR_KELAS_NOT_EXIST':
                        throw ('Kode kelas yang kamu masukan tidak terdaftar.')
                    case 'ERR_USER_EXIST':
                        throw ('Username tersebut sudah terdaftar. Silahkan ganti username atau masuk dengan username tersebut.')
                    case 'ERR_REGISTER':
                        throw ('Mohon maaf pendaftaran gagal. Silahkan ulangi kembali beberapa saat lagi ya!')
                    case 'ERR_BAD_REQUEST':
                        throw ('Mohon maaf sepertinya terjadi kesalahan pada applikasi. Kamu bisa menghubungi Admin untuk mendapatkan bantuan.')
                    default:
                        throw (errRes.message)
                }
            } else if (errRes.message) {
                throw(errRes.message)
            }
            
            throw ('Sepertinya kamu tidak terhubung ke Server. Periksa kembali jaringan internet kamu ya.')
            
        }

        Axios.post(`${config.base_url}`, bodyRaw, header).then(async res => {
            const resData = res.data

            dispatch({
                type: AUTHENTICATE,
                token: resData.accessToken,
                refToken: resData.refreshToken,
                userId: resData.data.id,
                username: resData.data.username,
                error: false
            })
            await saveData(resData.accessToken, resData.data.id)
        }).catch(err => {
            
        })
    }
}

const saveData = async (token, userId, username, fullName) => {
    return await AsyncStorage.setItem('userData', JSON.stringify({token, userId, username, fullName}))
}