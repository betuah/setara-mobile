import { AUTHENTICATE, ERROR, SET_LOADING } from '../actions/authAction'

const initState = {
    token: null,
    refToken: null,
    userId: null,
    error: null,
    isLoading: false
}

const LOGOUT = 'LOGOUT'

const auth = (state = initState, actions) => {
    switch (actions.type) {
        case AUTHENTICATE:
            return {
                ...state,
                token: actions.token,
                refToken: actions.refToken,
                userId: actions.userId,
                isLoading: false
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
        
        case LOGOUT:
            return initState
    
        default:
            return state;
    }
}

export default auth