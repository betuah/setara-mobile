import Axios from 'axios';

export const SIGN_UP = 'SIGN_UP'
export const ERROR = 'ERROR'
export const SET_LOADING = 'SET_LOADING'

export const users = data => {
    return async dispatch => {
        dispatch({type: SET_LOADING, loading: true})

        const bodyRaw = {username: data.uname,password: data.password}
        const header  = {headers: {'Content-Type': 'application/json'}}

        Axios.post('http://10.0.2.2:8000/api/v1/signup', bodyRaw, header).then(res => {
            data = res.data

            dispatch({
                type: AUTHENTICATE,
                token: data.accessToken,
                refToken: data.refreshToken,
                userId: data.uname,
                error: false
            })
            console.log(JSON.stringify(data))
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