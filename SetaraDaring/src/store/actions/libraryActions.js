export const DO_REFRESH = 'DO_REFRESH';

export const doRefresh = data => {
    return async dispatch => {
        dispatch({
            type: DO_REFRESH,
            refresh: data
        })
    }
}