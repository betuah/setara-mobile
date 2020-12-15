import { FEED, LOAD_FEED, LOAD_CLASS_FEED, DETAIL_FEED } from '../actions/homeActions'

const initState = {
    feed: [],
    feedClass: [],
    detailFeed: null
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
        
        case LOAD_CLASS_FEED:
            return {
                ...state,
                feedClass: [...actions.feedClass]
            }

        case DETAIL_FEED:
            return {
                ...state,
                detailFeed: actions.detailFeed
            }

        default:
            return state;
    }
}

export default HomeReducer