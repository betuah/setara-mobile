import { AUTHENTICATE, ERROR, SET_LOADING, SIGN_OUT } from '../actions/authAction'

const initState = {
    token: null,
    refToken: null,
    userId: null,
    username: null,
    fullName: null,
    foto: null,
    role: null,
    sekolah: null,
    status: null
}

const auth = (state = initState, actions) => {
    switch (actions.type) {
        case AUTHENTICATE:
            // console.log(actions)
            return {
                ...state,
                token: actions.token,
                refToken: actions.refToken ? actions.refToken : null,
                userId: actions.userId,
                username: actions.username,
                fullName: actions.fullName,
                foto: actions.foto,
                role: actions.role,
                status: actions.status,
                sekolah: actions.sekolah,
                isLoading: false
            }
        
        case SIGN_OUT:
            return {
                ...state,
                ...actions.data
            }
    
        default:
            return state;
    }
}

export default auth