const env     = require('../env') // Import Environment config
const User    = require('../models/usersData.model') // Import User Model

// Start user detail function
exports.profile = async (req, res) => {
    const id    = req.userId // Get UserId from middleware

    try {
        // Find user by id in User Model
        User.findById({ _id: id }).then((user) => {
            // If not Error
            if(user) { // If User exist
                user.foto = user.foto ? `${env.picture_path}${user.foto}` : ''

                res.status(200).json({status: 'Success', code: 'OK', data: user})
            } else { // If user data is null
                res.status(404).json({ status: 'Error', code: 'ERR_USER_NOT_FOUND', message: 'User Not Found!'})
            }
        }).catch((err) => { // Catch Error
            res.status(400).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
            console.log(new Error(err))
        })
    } catch (error) { // Catch any Error
        res.status(400).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
        console.log(new Error(err))
    }
}

// set Profile function
exports.setProfile = async (req, res) => {
    const id    = req.userId // Get UserId from middleware

    try {
        // Get user data from API body Raw or form from front end request
        const nama              = req.body.nama
        const email             = req.body.email
        const jk                = req.body.jk
        const sekolah           = req.body.sekolah
        const provinsi          = req.body.provinsi
        const kabupaten         = req.body.kabupaten
        const website           = req.body.website ? req.body.website : ''
        const facebook          = req.body.facebook ? req.body.facebook : ''
        const linkedin          = req.body.linkedin ? req.body.linkedin : ''
        const twitter           = req.body.twitter ? req.body.twitter : ''
        
        let dataSosmed = {}

        if (website.trim() || facebook.trim() || linkedin.trim() || twitter.trim()) {
            dataSosmed = {
                ...website.trim() && {website},
                ...facebook.trim() && {facebook},
                ...linkedin.trim() && {linkedin},
                ...twitter.trim() && {twitter}
            }
        }

        const dataProfile = {
            ...nama != undefined && (nama.trim() && {nama}),
            ...email != undefined && (email.trim() && {email}),
            ...sekolah != undefined && (sekolah.trim() && {sekolah}),
            ...jk != undefined && (jk.trim() && {jk}),
            ...provinsi != undefined && (provinsi.trim() && {provinsi}),
            ...kabupaten != undefined && (kabupaten.trim() && {kabupaten}),
            ...dataSosmed && {sosmed : {...dataSosmed}}
        }

        // Find user by id in User Model
        User.findOneAndUpdate({ _id: id },{
            ...dataProfile
        },{
            new: true
        }).then((updatedAccount) =>{
            res.status(200).json({status: 'Success', code: 'OK', data: updatedAccount})
        }).catch((err) => { // Catch Error
            res.status(400).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
            console.log(new Error(err))
        })
    } catch (error) { // Catch any Error
        res.status(400).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
        console.log(new Error(error))
    }
}

// Upload Foto
exports.avatarUpload = (req, res) => {
    const path = 'public/avatars'

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, (path))
        },
        filename: (req, file, callback) => {
            let filetype = file.mimetype === 'image/png' ? 'png' : (file.mimetype === 'image/jpg' ? 'jpg' : (file.mimetype === 'image/jpeg' && 'jpeg'))

            callback(null, `${req.id_user}_${Date.now()}.${filetype}`)
        }
    })

    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
            }
        }
    }).any('file')

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send({
                code: 500,
                status: 'INTERNAL_SERVER_ERROR',
                message: err
            })
        } else {
            const fileData = req.files[0]

            usersData.findOneAndUpdate({ userId: req.id_user },
            { 
                $set: { 
                    "personalData.photoUrl" : {
                        sourceId: 'api',
                        url: fileData.filename
                    }
                }
            }, { upsert: true })
            .then(data => {})
            .catch(err => {
                console.log(new Error(err))
                fs.unlink(`public/avatars/${fileData.filename}s`, err => {
                    console.log('Catch Error update firebase database. ', err)
                })
            })
            
            res.status(sendToFirebase.code).json(sendToFirebase)
        }
    })
    
}