import { READ, LOAD_NOTIF } from '../actions/notifActions'

const initState = {
    notif : [],
}

const NotifReducer = (state = initState, actions) => {
    switch (actions.type) {
        case LOAD_NOTIF:
            return {
                ...state,
                notif: [...actions.notif]
            }
        case READ:
            
            return {
                ...state,
                notif: [...actions.notif]
            }
    
        default:
            return state;
    }
}

export default NotifReducer