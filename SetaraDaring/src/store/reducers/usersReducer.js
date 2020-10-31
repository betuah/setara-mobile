import { SIGN_UP, ERROR, SET_LOADING } from '../actions/usersAction'

const initState = {
    kode_kelas: null,
    nama: null,
    username: null,
    email: null,
    password: null,
    status: null, // siswa | guru
    isLoading: false,
    error: false
}

const users = (state = initState, actions) => {
    switch (actions.type) {
        case SIGN_UP:
            return {
                ...state,
                kode_kelas: actions.kode_kelas,
                nama: actions.nama,
                username: actions.username,
                email: actions.email,
                password: actions.password,
                status: actions.status,
                isLoading: false,
                error: false
            }

        case ERROR: {
            return {
                ...state,
                error: actions.error,
                isLoading: false,
            }
        }

        case SET_LOADING: {
            return {
                ...state,
                isLoading: actions.loading
            }
        }
    
        default:
            return state;
    }
}

export default users