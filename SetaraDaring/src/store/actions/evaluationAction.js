import config from '../../config/baseUrl';
import AxiosAPI from '../../config/AxiosAPI';
import ErrorHandler from '../../constants/ErrorHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOAD_QUIZ      = 'LOAD_QUIZ'
export const DETAIL_QUIZ    = 'DETAIL_QUIZ'
export const ADD_QUIZ       = 'ADD_QUIZ'
export const LOAD_SOAL      = 'LOAD_SOAL'
export const FLUSH_SOAL     = 'FLUSH_SOAL'
export const SAVE_JAWABAN   = 'SAVE_JAWABAN'
export const SET_JAWABAN    = 'SET_JAWABAN'
export const ANS_EXIST      = 'ANS_EXIST'

export const loadListQuiz = (mapelId) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/quiz/${mapelId}`)
            const resData = res.data

            dispatch({type: LOAD_QUIZ, listQuiz: resData.data})
        } catch (error) {
            // console.log(error, 'error quiz load')
            ErrorHandler(error)
        }
    }
}

export const getDetailQuiz = (quizId) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/quiz/detail/${quizId}`)
            const resData = res.data

            let bol
            const ans = await AsyncStorage.getItem(resData.data._id)
            if (ans) {
                bol = true
            } else {
                bol = false
            }

            dispatch({type: DETAIL_QUIZ, detailQuiz: resData.data, isAnsExist: bol})
        } catch (error) {
            // console.log(error, 'error quiz detail')
            ErrorHandler(error)
        }
    }
}

export const getDetailSoal = (paketId) => {
    return async dispatch => {
        try {
            const res = await AxiosAPI.get(`${config.base_url}/api/v1/quiz/paket/${paketId}`)
            const resData = res.data
            
            dispatch({type: LOAD_SOAL, detailSoal: resData.data})
        } catch (error) {
            // console.log(error, 'error soal detail')
            ErrorHandler(error)
        }
    }
}

export const flushDetailSoal = () => {
    return async dispatch => {
        try {
            dispatch({type: FLUSH_SOAL, flushSoal: true})
        } catch (error) {
            // console.log(error, 'error flust detail soal')
            ErrorHandler(error)
        }
    }
}

export const setJawaban = ansData => {
    return async dispatch => {
        try {
            dispatch({type: SET_JAWABAN, answers: ansData})
        } catch (error) {
            ErrorHandler(error)
        }
    }
}

export const saveJawaban = (id, id_paket, jawaban) => {
    return async dispatch => {
        try {
            const ans = {
                id_paket: id_paket,
                jawaban: [...jawaban]
            }

            await AsyncStorage.setItem(`${id}`, JSON.stringify(ans))
            const res = await AxiosAPI.post(`${config.base_url}/api/v1/quiz/${id}`, ans)
            const resData = res.data.data
            await AsyncStorage.removeItem(`${id}`)
            dispatch({type: SAVE_JAWABAN, nilai: resData.nilai})
        } catch (error) {
            if (error.response && error.response.status === 409) throw (409)
            throw (error)
        }
    }
}

export const reSendQuiz = (id) => {
    return async dispatch => {
        try {
            const ansTmp        = await AsyncStorage.getItem(`${id}`)
            const existAnsData  = JSON.parse(ansTmp) 

            const res = await AxiosAPI.post(`${config.base_url}/api/v1/quiz/${id}`, existAnsData)
            const resData = res.data.data
            await AsyncStorage.removeItem(`${id}`)
            dispatch({type: SAVE_JAWABAN, nilai: resData.nilai})
        } catch (error) {
            if (error.response && error.response.status === 409) throw (409)
            throw (error)
        }
    }
}

export const setAnsExist = id => {
    return async dispatch => {
        try {
            let bol
            console.log(id)
            const ans = await AsyncStorage.getItem(id)
            if (ans) {
                bol = true
            } else {
                bol = false
            }

            dispatch({type: ANS_EXIST, isAnsExist: bol})
        } catch (error) {
            if (error.response && error.response.status === 409) throw (409)
            throw (error)
        }
    }
}