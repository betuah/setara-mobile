import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import config from '../../constants/config';

export const AUTHENTICATE = 'AUTHENTICATE';
export const ERROR = 'ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

const header  = {
    headers: {'Content-Type': 'application/json'},
    timeout: 10000
}

const AxiosApi = Axios.create();

AxiosApi.interceptors.request.use(
    async config => {
        const resData = await AsyncStorage.getItem('userData')
        const data = JSON.parse(resData)

        config.headers = { 
            'Authorization': `Bearer ${data.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        config.timeout = 10000
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

AxiosApi.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.data.code === "ERR_TOKEN_EXPIRED") {
        originalRequest._retry = true;

        console.log('asdsad')
        // const accToken = await refreshToken()

        // Axios.defaults.headers.common['Authorization'] = 'Bearer ' + accToken;
        return AxiosApi(originalRequest);
    }
    return Promise.reject(error);
});

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
        const bodyRaw = { username: data.uname,password: data.password }

        try {
            const res = await Axios.post(`${config.base_url}/api/v1/signin`, bodyRaw, header)
            const resData = res.data
            
            await saveData(resData.accessToken, resData.refreshToken, resData.data.id, resData.data.username, resData.data.name)
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
    }
}

export const signOut = (token) => {
    return async dispatch => {
        try {
            await AxiosApi.post(`${config.base_url}/api/v1/signout`)
            const data = {
                token: null,
                refToken: null,
                userId: null,
                username: null,
                fullName: null,
            }
            
            // await deleteData()
            // dispatch({
            //     type: SIGN_OUT,
            //     data: data
            // })
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
                    case 'ERR_TOKEN_EXPIRED':
                        // console.log('test')
                        // getToken()
                        throw ('Token Sudah Kadaluarsa')
                    default:
                        throw (errRes.message)
                }
            } else if (errRes.message) {
                throw(errRes.message)
            }

            throw ('Sepertinya kamu tidak terhubung ke Server. Periksa kembali jaringan internet kamu ya.')
        }
    }
}

const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const userReq = await AsyncStorage.getItem('userData')
            const userData = JSON.parse(userReq)

            const tokenData = await Axios.post(`${config.base_url}/api/v1/token`, { refreshToken: userData.refToken}, header)
            console.log(tokenData)

            resolve(tokenData.accessToken)
        } catch (error) {
            reject(error)
        }
    })
}

const saveData = async (token, refToken, userId, username, fullName) => {
    try {
        return await AsyncStorage.setItem('userData', JSON.stringify({token, refToken, userId, username, fullName}))
    } catch (error) {
        console.log(error)
        throw (error)
    }
    
}

const deleteData = async () => {
    try {
        return await AsyncStorage.removeItem('userData')
    } catch (error) {
        console.log(error)
        throw (error)
    }
}