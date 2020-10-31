import Axios from 'axios';

export const AUTHENTICATE = 'AUTHENTICATE'
export const ERROR = 'ERROR'
export const SET_LOADING = 'SET_LOADING'
export const SIGN_UP = 'SIGN_UP'

export const signIn = data => {
    return async dispatch => {
        dispatch({type: SET_LOADING, loading: true})

        const bodyRaw = {username: data.uname,password: data.password}
        const header  = {headers: {'Content-Type': 'application/json'}}

        Axios.post('http://10.0.2.2:8000/api/v1/signin', bodyRaw, header).then(res => {
            const resData = res.data

            dispatch({
                type: AUTHENTICATE,
                token: resData.accessToken,
                refToken: resData.refreshToken,
                userId: resData.data.id,
                username: resData.data.username,
                error: false
            })
        }).catch(err => {
            const errRes = err.response.data
            
            if (errRes.code === 'ERR_INCORRECT_USER_PASS') {
                dispatch({type: ERROR, error: 'Sepertinya username atau password kamu ada yang salah.'})
            } else {
                dispatch({type: ERROR, error: errRes.message})
            }
        })
    }
}

export const signUp = data => {
    return async dispatch => {
        dispatch({type: SET_LOADING, loading: true})

        const bodyRaw = {
            username: data.uname,
            password: data.password,
            nama: data.name,
            email: data.email ? data.email : '',
            kode_kelas: data.kode_kelas,
            status: data.status
        }
        const header  = {headers: {'Content-Type': 'application/json'}}

        Axios.post('http://10.0.2.2:8000/api/v1/signup', bodyRaw, header).then(res => {
            const resData = res.data

            dispatch({
                type: AUTHENTICATE,
                token: resData.accessToken,
                refToken: resData.refreshToken,
                userId: resData.data.id,
                username: resData.data.username,
                error: false
            })
        }).catch(err => {
            const errRes = err.response.data
            
            if (errRes.code === 'INCORRECT_USER_PASS') {
                dispatch({type: ERROR, error: 'Sepertinya username atau password kamu ada yang salah.'})
            } else {
                dispatch({type: ERROR, error: errRes.message})
            }
        })
    }
}

export const error = error => {
    return dispatch => {
        dispatch({
            type: ERROR,
            error
        })
    }
}