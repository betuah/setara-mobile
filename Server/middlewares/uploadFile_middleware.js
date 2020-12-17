const multer        = require('multer')
const fs            = require('fs')

const uploadMiddleware = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const path = `public/files/${req.userId}/`
    
            if (!fs.existsSync(path)){
                fs.mkdirSync(path);
            }
    
            callback(null, (path))
        },
        filename: (req, file, callback) => {
            
            callback(null, `${file.originalname}`)
        }
    })
    
    const upload = multer({
        storage: storage,
        // fileFilter: (req, file, cb) => {
        //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        //         cb(null, true);
        //     } else {
        //         cb(null, false);
        //         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        //     }
        // }
    }).array('files')

    upload(req, res, (err) => {
        if (err) {
            console.log(new Error(err))
            return res.status(500).json({
                code: 'ERR_UPLOAD_FILE',
                status: 'Error Upload File!',
                message: err
            })
        } else {
            next()
        }
    })
}

module.exports = uploadMiddleware