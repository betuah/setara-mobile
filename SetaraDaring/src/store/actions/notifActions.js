export const READ = 'READ';

export const read = data => {
    return async dispatch => {
        dispatch({
            type: READ,
            notif: {...data, read: true}
        })
    }
}