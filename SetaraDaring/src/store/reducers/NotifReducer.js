import { READ } from '../actions/notifActions'

const initState = {
    notif: [
        {
            id: '1',
            notifTitle: 'Testing Notif',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now(),
            image: 'https://seamolec.org/images/banner/96900.jpg',
            category: 1,
            label: 'Pengumuman'
        },
        {
            id: '2',
            notifTitle: 'Testing Notif 1',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now(),
            category: 1,
            label: 'Pengumuman'
        },
        {
            id: '3',
            notifTitle: 'Testing Notif 2',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now(),
            category: 1,
            label: 'Pengumuman'
        },
        {
            id: '4',
            notifTitle: 'Testing Notif 3',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now(),
            category: 2,
            label: 'Diskusi'
        },
        {
            id: '5',
            notifTitle: 'Testing Notif 4',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now(),
            image: 'https://seamolec.org/images/banner/96900.jpg',
            category: 3,
            label: 'Tugas'
        },
        {
            id: '6',
            notifTitle: 'Testing Notif 5',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now(),
            category: 3,
            label: 'Tugas'
        },
        {
            id: '7',
            notifTitle: 'Testing Notif 6',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now(),
            category: 4,
            label: 'Quiz'
        },
        {
            id: '8',
            notifTitle: 'Testing Notif 7',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now(),
            image: 'https://seamolec.org/images/banner/96900.jpg',
            category: 2,
            label: 'Diskusi Umum'
        },
        {
            id: '9',
            notifTitle: 'Testing Notif 8',
            notifContent: 'This is the notification details',
            read: true,
            createdTime: Date.now(),
            category: 3,
            label: 'Tugas Di Tutup'
        },
        {
            id: '10',
            notifTitle: 'Testing Notif 9',
            notifContent: 'This is the notification details',
            read: false,
            createdTime: Date.now(),
            category: 4,
            label: 'Ujian Akhir Semester'
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