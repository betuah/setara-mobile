import { READ } from '../actions/notifActions'

const initState = {
    notif: [
        {
            id: '1',
            notifTitle: 'Testing Notif',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now()
        },
        {
            id: '2',
            notifTitle: 'Testing Notif 1',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now()
        },
        {
            id: '3',
            notifTitle: 'Testing Notif 2',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now()
        },
        {
            id: '4',
            notifTitle: 'Testing Notif 3',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now()
        },
        {
            id: '5',
            notifTitle: 'Testing Notif 4',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now()
        },
        {
            id: '6',
            notifTitle: 'Testing Notif 5',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now()
        },
        {
            id: '7',
            notifTitle: 'Testing Notif 6',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now()
        },
        {
            id: '8',
            notifTitle: 'Testing Notif 7',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now()
        },
        {
            id: '9',
            notifTitle: 'Testing Notif 8',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now()
        },
        {
            id: '10',
            notifTitle: 'Testing Notif 9',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now()
        }
    ]
}

const NotifReducer = (state = initState, actions) => {
    switch (actions.type) {
        case READ:
            const prevNotif = state.notif
            let index = prevNotif.findIndex(item => item.id === actions.notif.id)
            prevNotif[index].read = true
            
            return {
                ...state,
                notif: [...prevNotif]
            }
    
        default:
            return state;
    }
}

export default NotifReducer