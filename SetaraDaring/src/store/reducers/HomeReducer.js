import { FEED, LOAD_FEED } from '../actions/homeActions'

const initState = {
    feed: []
}

const HomeReducer = (state = initState, actions) => {
    switch (actions.type) {
        case FEED:
            return {
                ...state,
                feed: [...state.feed, ...actions.feed]
            }
    
        case LOAD_FEED:
            return {
                ...state,
                feed: [...actions.feed],
            }

        default:
            return state;
    }
}

export default HomeReducer