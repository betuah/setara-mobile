import { AUTHENTICATE, ERROR, SET_LOADING, SIGN_OUT } from '../actions/authAction'

const initState = {
    token: null,
    refToken: null,
    userId: null,
    username: null,
    fullName: null,
    foto: 'http://setara.kemdikbud.go.id/media/Assets/foto/aa61ff1b9_0110202020015.jpg',
    status: 'Warga Belajar'
}

const auth = (state = initState, actions) => {
    switch (actions.type) {
        case AUTHENTICATE:
            return {
                ...state,
                token: actions.token,
                refToken: actions.refToken ? actions.refToken : null,
                userId: actions.userId,
                username: actions.username,
                fullName: actions.fullName,
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