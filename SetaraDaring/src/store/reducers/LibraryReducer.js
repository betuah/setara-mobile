import { DO_REFRESH } from '../actions/libraryActions'

const initState = {
    refresh: false
}

const libraryReducer = (state = initState, actions) => {
    switch (actions.type) {
        case DO_REFRESH:
            return {
                ...state,
                refresh: actions.refresh
            }
    
        default:
            return state;
    }
}

export default libraryReducer