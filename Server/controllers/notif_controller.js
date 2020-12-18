
const notif = [
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

exports.getAllNotif = async (req, res) => {
    const userId = req.userId

    res.status(200).json({
        code: 'OK',
        status: 'Success',
        data: []
    })
}

exports.readNotif = async (req, res) => {
    try {
        const id = req.body.idNotif ? req.body.idNotif : ''

        res.status(200).json({
            code: 'OK',
            status: 'Success',
            data: notif
        })
    } catch (error) {
        console.log(new Error(error))
        res.status(200).json({
            code: 'ERR_INTERNAL_SERVER_ERROR',
            status: 'Internal Server Error',
            data: error
        })
    }
}