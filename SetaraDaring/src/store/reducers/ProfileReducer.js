import { LOAD_DATA, UPDATE_DATA, RESET_PASS } from '../actions/profileActions'

const initState = {
    profile: null,
    settings: {}
}

const profileReducer = (state = initState, actions) => {
    switch (actions.type) {
        case LOAD_DATA:
            return {
                ...state,
                profile: actions.profile,
                settings: actions.settings
            }
    
        case UPDATE_DATA:
            return {
                ...state,
                profile: actions.profile
            }

        case RESET_PASS:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default profileReducer