import { AUTHENTICATE, ERROR, SET_LOADING } from '../actions/authAction'

const initState = {
    token: null,
    refToken: null,
    userId: null,
    username: null,
    fullName: null
}

const LOGOUT = 'LOGOUT'

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
        
        case LOGOUT:
            return initState
    
        default:
            return state;
    }
}

export default auth