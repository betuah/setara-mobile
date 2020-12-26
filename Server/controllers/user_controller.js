const fs            = require('fs')
const env           = require('../env') // Import Environment config
const User          = require('../models/usersData.model') // Import User Model
const feedbackModel = require('../models/feedbackData.modal') // Import Feedback Model
const reportModel   = require('../models/reportData.modal') // Import report data model

// Start user detail function
exports.profile = async (req, res) => {
    const id    = req.userId // Get UserId from middleware

    try {
        // Find user by id in User Model
        User.findById({ _id: id }).then((user) => {
            // If not Error
            if(user) { // If User exist
                const photoWithPath = `${env.path_protocol}://${user.path}`
                user.foto = user.foto ? `${user.path ? photoWithPath : env.picture_path}${user.foto}` : ''

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

        const dataProfile = {
            ...nama != undefined && (nama.trim() && {nama}),
            ...email != undefined && (email.trim() && {email}),
            ...sekolah != undefined && (sekolah.trim() && {sekolah}),
            ...jk != undefined && (jk.trim() && {jk}),
            ...provinsi != undefined && (provinsi.trim() && {provinsi}),
            ...kabupaten != undefined && (kabupaten.trim() && {kabupaten}),
            sosmed: {
                website,
                facebook,
                linkedin,
                twitter
            }
        }

        // Find user by id in User Model
        User.findOneAndUpdate({ _id: id },{
            ...dataProfile
        },{
            new: true
        }).then((updatedAccount) =>{
            const photoWithPath = `${env.path_protocol}://${updatedAccount.path}`
            updatedAccount.foto = updatedAccount.foto ? `${updatedAccount.path ? photoWithPath : env.picture_path}${updatedAccount.foto}` : ''
            
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
    try {
        const fileData = req.files

        User.findOneAndUpdate(
            { _id: req.userId }, 
            { 
                foto: fileData[0].filename, 
                path: 'api.setara.kemdikbud.go.id/public/photo/'
            }
        ).then(resData => {
            const photoWithPath = `${env.path_protocol}://${resData.path}`
            resData.foto = resData.foto ? `${resData.path ? photoWithPath : env.picture_path}${resData.foto}` : ''

            res.status(200).json({status: 'Success', code: 'OK', data: resData})
        }).catch(err => {
            console.log(new Error(err))
            fs.unlink(`public/photo/${fileData.filename}`, err => {
                console.log(new Error('Catch Error update firebase database. ', err))
                res.status(500).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
            })
        })
    } catch (error) {
        console.log(new Error(error))
        res.status(500).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
    }
}

exports.userReport = (req, res) => {
    try {
        const id        = req.userId
        const judul     = req.body.judul
        const detail   = req.body.detail

        const data = {
            id_user : id,
            judul: judul,
            detail: detail
        }

        reportModel.create(data).then(resData => {
            res.status(200).json({
                code: 'OK',
                Status: 'Success',
                message: 'You response are received. Thanks you!'
            })
        }).catch(error => {
            console.log(new Error(error))
            res.status(500).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
        })

    } catch (error) {
        console.log(new Error(error))
        res.status(500).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
    }
}

exports.userFeedback = (req, res) => {
    try {
        const id        = req.userId
        const feedback  = req.body.feedback

        const data = {
            id_user : id,
            saran: feedback
        }

        feedbackModel.create(data).then(resData => {
            res.status(200).json({
                code: 'OK',
                Status: 'Success',
                message: 'You response are received. Thanks you!'
            })
        }).catch(error => {
            console.log(new Error(error))
            res.status(500).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
        })
    } catch (error) {
        console.log(new Error(error))
        res.status(500).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
    }
}