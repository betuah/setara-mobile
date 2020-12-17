const multer        = require('multer')
const fs            = require('fs')

const uploadPhotoMiddleware = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const path = 'public/photo'

            if (!fs.existsSync(path)){
                fs.mkdirSync(path);
            }

            callback(null, (path))
        },
        filename: (req, file, callback) => {
            let filetype = file.mimetype === 'image/png' ? 'png' : (file.mimetype === 'image/jpg' ? 'jpg' : (file.mimetype === 'image/jpeg' && 'jpeg'))
            callback(null, `${req.userId}.${filetype}`)
        }
    })

    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error({code: 'ERR_UPLOAD_FILE_TYPE', msg: 'Only .png, .jpg and .jpeg format allowed!'}))
            }
        }
    }).any('photo')

    upload(req, res, (err) => {
        if (err) {
            console.log(new Error(err))
            return res.status(500).json({
                code: err.code ? err.code : 'ERR_UPLOAD_FILE',
                status: 'Error Upload File!',
                message: err.msg ? err.msg : err
            })
        } else {
            next()
        }
    })
}

module.exports = uploadPhotoMiddleware