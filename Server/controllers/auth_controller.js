const bcrypt  = require('bcryptjs') // Import bcrypt
const User    = require('../models/usersData.model') // Import User Model

/*  
* Start Import Auth Service
* Any auth function in Auth service
* Path : ../Server/services/authService
*/
const { 
    generateJwtToken,
    generateRefreshToken,
    revokeToken,
    setTokenCookie
} = require('../services/authService')
/* End Import Auth Service */

/* Start signIn function */
const signIn = async (req, res) => {
    try {
        // Get username and password from any request (query, raw body, form, and params)
        const username      = req.query.username ? req.query.username : (req.body.username ? req.body.username : req.params.username)
        const password      = req.query.password ? req.query.password : (req.body.password ? req.body.password : req.params.password)

        // Find and get User data from user model, reference from mongoose docs
        const user = await User.findOne({ uname: username }) 

        // Check if user exist and password is valid
        if (!user || !bcrypt.compareSync(password, user.password)) {
            console.log(new Error('Username or password is incorrect!')) // Show error to log status
            res.status(400).json({code: 'INCORRECT_USER_PASS', message: 'Username dan Password salah!'}) // Response error to front end 
        }

        // authentication successful so generate jwt and refresh tokens
        const jwtToken      = generateJwtToken(user) // Generate Access Token From Auth Service
        const refreshToken  = generateRefreshToken(user) // Generate Refresh Token From Auth Service

        // save refresh token to database from Auth Service
        await refreshToken.save()

        // return user details and tokens
        const resData = { 
            data: {
                username: user.username,
                name: user.name,
                email: user.email,
                status: user.status
            },
            accessToken : jwtToken,
            refreshToken: refreshToken.token
        }

        setTokenCookie(res, refreshToken.token) // Set refresh token to cookie
        res.status(200).json(resData) // Response success status with User and token data
    } catch (error) { // Catch Error
        // if (error) console.log(new Error(error)) // Show error in log
        res.status(400).json('error') // Give error status response to front end
    }
    
}
/* Akhir Fungsi signIn */

// Start SignUp Function
const signUp = async (req, res) => {
    try {
        // Get user data from API body Raw or form from front end request
        const username          = req.body.username
        const nama              = req.body.nama
        const status            = req.body.status
        const email             = req.body.email
        const password          = req.body.password
        const passwordHashed    = await bcrypt.hash(password, 12) // Hasing password with auto generate salt

        // Create oject/json data
        const dataBody = {
            username,
            nama,
            email,
            password: passwordHashed,
            status
        }

        // Send and create user with user data Oject
        User.create(dataBody)
        .then(data => {
            // If user successfully created
            res.status(201).json({ status: 'Success', code: 200, 'msg': 'SignUp Success!', data: data}) 
        })
        .catch(err => {
            // If creating user error
            console.log(new Error(err)) // Show error log in log
            if (err.code === 11000) { 
                // If user already exist
                res.status(500).json({ status: 'error', code: 400, 'msg' : 'Username already exist!' })
            } else {
                // If another error
                res.status(500).json({ status: 'error', code: 400, 'msg' : 'Failed to saving data!' })
            }
        })
    } catch (error) { // Catch any error
        console.log(error) // Show error in console

        // Create Error Object/Json data
        const data = {
            status: 'ERROR',
            code: 400,
            msg: 'Data Required!',
            POST_DATA_REQUIREMENT: {
                username: {
                    type: 'text',
                    required: 'true',
                    unique: 'true',
                    data_type: 'varchar(50)'
                },
                name: {
                    type: 'text',
                    required: 'true',
                    unique: 'true',
                    data_type: 'varchar(50)'
                },
                email: {
                    type: 'email',
                    required: 'true',
                    unique: 'true',
                    data_type: 'varchar(50)'
                },
                password: {
                    type: 'password',
                    required: 'true',
                    unique: 'false',
                    data_type: 'varchar(50)'
                }
            }
        }

        res.status(400).json(data) // Send error data to front end
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
                res.status(404).json({ status: 'Error', code: 404, msg: 'User Not Found!'})
            }            
        }).catch((err) => { // Catch Error
            res.status(400).json({ status: 'Error', code: 500, msg: 'Internal Server Error' })
            console.log(new Error(err))
        })
    } catch (error) { // Catch any Error
        res.status(400).json({ status: 'Error', code: 500, msg: 'Internal Server Error' })
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

// const getTokens = async (req, res) => {
//     getRefreshTokens(req.userId)
//         .then(tokens => {
//             res.json(tokens)
//         })
//         .catch(err => {
//             console.log(new Error(err))
//             res.send('error')
//         })
// }

// Export All function
module.exports = {
    signIn,
    signUp,
    signOut,
    account,
    // getTokens 
}