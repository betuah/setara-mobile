import { DARK_MODE } from '../actions/themeAction'

const initState = {
    darkMode: false
}

const ThemeReducer = (state = initState, actions) => {
    switch (actions.type) {
        case DARK_MODE:
            return {
                ...state,
                darkMode: actions.darkMode
            }
    
        default:
            return state;
    }
}

export default ThemeReducer