export const DARK_MODE = 'DARK_MODE';

export const setDarkMode = data => {
    return async dispatch => {
        dispatch({
            type: DARK_MODE,
            darkMode: data
        })
    }
}