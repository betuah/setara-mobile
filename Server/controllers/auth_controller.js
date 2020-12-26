const bcrypt  = require('bcryptjs') // Import bcrypt
const env     = require('../env') // Import Environment config
const User    = require('../models/usersData.model') // Import User Model
const Kelas   = require('../models/kelasData.model') // Import Kelas Model
const AnggotaKel = require('../models/anggotaKelas.model') // Import Anggota Kelas Model

/*
* Start Import Auth Service
* Any auth function in Auth service
* Path : ../Server/services/authService
*/
const {
    generateJwtToken,
    generateRefreshToken,
    revokeToken,
    setTokenCookie,
    refreshToken
} = require('../services/authService')
/* End Import Auth Service */

const index = async (req, res) => {
    res.status(200).send('I am alive')
}

/* Start signIn function */
const signIn = async (req, res) => {
    try {
        // Get username and password from any request (query, raw body, form, and params)
        const username      = req.query.username ? req.query.username : (req.body.username ? req.body.username : req.params.username)
        const password      = req.query.password ? req.query.password : (req.body.password ? req.body.password : req.params.password)

        // Find and get User data from user model, reference from mongoose docs
        const user = await User.findOne({ username: username })

        // Check if user exist and password is valid
        if (!user || !bcrypt.compareSync(password, user.password)) {
            // console.log(new Error('Username or password is incorrect!')) // Show error to log status

            res.status(400).json({code: 'ERR_INCORRECT_USER_PASS', message: 'Username dan Password salah!'}) // Response error to front end
        } else {
            // authentication successful so generate jwt and refresh tokens
            const jwtToken      = generateJwtToken(user) // Generate Access Token From Auth Service
            const refreshToken  = generateRefreshToken(user) // Generate Refresh Token From Auth Service

            // save refresh token to database from Auth Service
            await refreshToken.save()

            // return user details and tokens
            const resData = {
                code: 'OK',
                message: 'Berhasil Masuk.',
                data: {
                    id: user.id,
                    username: user.username,
                    name: user.nama,
                    email: user.email,
                    status: user.status,
                    picture: `${env.picture_path}${user.foto}`,
                    sekolah: user.sekolah
                },
                accessToken : jwtToken,
                refreshToken: refreshToken.token
            }

            setTokenCookie(res, refreshToken.token) // Set refresh token to cookie
            res.status(200).json(resData) // Response success status with User and token data
        }
    } catch (error) { // Catch Error
    // if (error) console.log(new Error(error)) // Show error in log

    res.status(400).json({code: 'ERR_INTERNAL_SERVER_ERROR', message: 'Ops... Ada yang salah dengan server!'}) // Give error status response to front end
}

}
/* Akhir Fungsi signIn */

// Start SignUp Function
const signUp = async (req, res) => {
    try {
        // Get user data from API body Raw or form from front end request
        const kode_kelas        = req.body.kode_kelas ? req.body.kode_kelas : ''
        const username          = req.body.username
        const nama              = req.body.nama
        const status            = req.body.status
        const email             = req.body.email ? req.body.email : ''
        const password          = req.body.password
        const passwordHashed    = await bcrypt.hash(password, 12) // Hasing password with auto generate salt

        // Create oject/json data
        const dataBody = {
            username,
            nama,
            email,
            password: passwordHashed.replace(/^\$2y(.+)$/i, '\$2a$1'),
            status
        }

        const kelas = await Kelas.findOne({kode: kode_kelas}) // Find kelas with kode_kelas

        if (!status) {
            const error = new Error('Harap memasukan status pendaftaran Anda!')
            error.code = 'ERR_STATUS_REQUIRED'
            throw error
        }

        if (status === 'siswa' && !kelas)  {
            const error = new Error('Kelas tidak ditemukan!')
            error.code = 'ERR_KELAS_NOT_EXIST'

            throw error
        }

        // Send and create user with user data Oject
        User.create(dataBody)
        .then(async data => {
            const jwtToken      = generateJwtToken(data) // Generate Access Token From Auth Service
            const refreshToken  = generateRefreshToken(data) // Generate Refresh Token From Auth Service

            // save refresh token to database from Auth Service
            await refreshToken.save()

            if (status === 'siswa') {
                await AnggotaKel.create({id_user: data.id, id_kelas: kelas._id, status: 1})
            }

            // Response data
            const resData = {
                status: 'Success',
                code: 'OK',
                message: 'Berhasil Mendaftar!',
                data: {
                    id: data.id,
                    username: dataBody.username,
                    name: dataBody.nama,
                    email: dataBody.email,
                    status: dataBody.status
                },
                accessToken : jwtToken,
                refreshToken: refreshToken.token
            }

            // If user successfully created
            res.status(201).json(resData)
        })
        .catch(err => {
            // If creating user error
            console.log(new Error(err)) // Show error log in log
            if (err.code === 11000) {
                // If user already exist
                res.status(500).json({ status: 'error', code: 'ERR_USER_EXIST', 'message' : 'Username already exist!' })
            } else {
                // If another error
                res.status(500).json({ status: 'error', code: 'ERR_REGISTER', 'message' : 'Failed to saving data!' })
            }
        })
    } catch (error) { // Catch any error
        console.log(new Error(error)) // Show error in console

        // Create Error Object/Json data
        const err = {
            status: 'ERROR',
            code: 'ERR_BAD_REQUEST',
            message: 'Gagal Daftar!'
        }

        // Send error data to front end
        if (error.code) { // If error code exist
            res.status(404).json({ status: 'error', code: error.code, 'message' : error.code === 'ERR_STATUS_REQUIRED' ? 'Harap memasukan status pendaftaran Anda!' : 'Kelas tidak ditemukan!' })
        } else {
            res.status(400).json(err)
        }
    }
}
// End singup function

// Start Singout Function
const signOut = async (req, res) => {
    const token = req.body.token || req.cookies.refToken // Get refresh token from cookie

    if (!token) return res.status(400).json({ message: 'Token is required!' }) // Check If token not found from body or cookie

    // Revoke Token with revoke function from Auth Service
    revokeToken({ token })
        .then(() => {
            res.status(200).json({ status: 'Success', mgs: 'Token Revoked' })
        })
        .catch(err => {
            console.log(new Error(err))
            res.status(500).json({ status: 'Error', mgs: err})
        })
}

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const userId  = req.userId
        const oldPass = req.body.oldpass ? req.body.oldpass : ''
        const newPass = req.body.newpass ? req.body.newpass : ''

        const passwordHashed = await bcrypt.hash(newPass, 12)

        if (oldPass && newPass) {
            // Find and get User data from user model, reference from mongoose docs
            const user = await User.findOne({ _id: req.userId })

            // Check if user exist and password is valid
            if (!user || !bcrypt.compareSync(oldPass, user.password)) {
                res.status(400).json({code: 'ERR_INCORRECT_OLDPASS', message: 'Password lama Anda salah!'})
            } else {
                User.findByIdAndUpdate(
                    { _id: userId },
                    {
                        password: passwordHashed.replace(/^\$2y(.+)$/i, '\$2a$1')
                    }
                    ).then((reData) => {
                    res.status(200).json({
                        code: 'OK',
                        status: 'Password Updated.',
                        data: {
                            id: req.userId,
                            username: reData.username,
                            name: reData.nama,
                            email: reData.email,
                            status: reData.status
                        }
                    })
                }).catch(err => {
                    console.log(new Error(err))
                    res.status(400).json({
                        code: 'ERR_UPDATE_PASS',
                        status: 'Error update password.',
                        message: err
                    })
                })
            }
        } else {
            res.status(404).json({
                code: 'ERR_PASS_REQUIRED',
                status: 'Password body required',
                message: 'Membutuhkan field password lama dan password baru.'
            })
        }
    } catch (error) {
        console.log(new Error(error))
        res.status(500).json({code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error'})
    }
}

// Get New Token
const generateNewToken = async (req, res) => {
    const token = req.cookies.refToken ? req.cookies.refToken : (req.body.refreshToken ? req.body.refreshToken : '') // Get refresh token from cookie

    refreshToken({ token }) // Create new token and refresh token
        .then((tokenData) => {
            // If creating token success
            setTokenCookie(res, tokenData.refreshToken) // Set refreshtoken to cookie
                .then(() => {
                    res.status(200).json({code: 'OK', ...tokenData}) // Send Token and RefreshToken to front end
                })
                .catch(err => { // If set cookie failed
                    console.log(new Error(err))
                    res.status(500).json({code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error'})
                })
        })
        .catch(err => { // If create new token and refresh token error
            console.log(new Error(err))
            res.status(406).json({ status: 'Invalid', code: 'ERR_GENERATE_TOKEN', message: err })
        })
}

// Export All function
module.exports = {
    index,
    signIn,
    signUp,
    signOut,
    generateNewToken,
    resetPassword
}
