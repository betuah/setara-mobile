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
                    picture: `${env.picture_path}${user.foto}`
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

// Start user detail function
const account = async (req, res) => {
    const id    = req.userId // Get UserId from middleware

    try {
        // Find user by id in User Model
        User.findById({ _id: id }).then((user) => {
            // If not Error
            if(user) { // If User exist
                res.status(200).json(user)
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
const setProfile = async (req, res) => {
    const id    = req.userId // Get UserId from middleware

    try {
        // Get user data from API body Raw or form from front end request
        const nama              = req.body.nama
        const email             = req.body.email
        const jenis_kelamin     = req.body.jenis_kelamin
        const sekolah           = req.body.sekolah
        const provinsi          = req.body.provinsi
        const kabupaten         = req.body.kabupaten
        const website           = req.body.website ? req.body.website : ''
        const facebook          = req.body.facebook ? req.body.facebook : ''
        const linkedin          = req.body.linkedin ? req.body.linkedin : ''
        const twitter           = req.body.twitter ? req.body.twitter : ''

        // Find user by id in User Model
        User.findOneAndUpdate({ _id: id },{
            nama: nama,
            email: email,
            jk: jk,
            sekolah:sekolah,
            provinsi: provinsi,
            kabupaten: kabupaten,
            sosmed:{
                website: website,
                facbook: facebook,
                linkedin: linkedin,
                twitter: twitter
            }
        },{
            new: true
        }).then((updatedAccount) =>{
            res.status(200).json(updatedAccount)
        }).catch((err) => { // Catch Error
            res.status(400).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
            console.log(new Error(err))
        })
    } catch (error) { // Catch any Error
        res.status(400).json({ status: 'Error', code: 'ERR_INTERNAL_SERVER', message: 'Internal Server Error' })
        console.log(new Error(err))
    }
}

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
    account,
    generateNewToken,
    setProfile
}
