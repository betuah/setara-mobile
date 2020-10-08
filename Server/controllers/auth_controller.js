const bcrypt  = require('bcryptjs')
const User    = require('../models/usersData.model')
const { 
    generateJwtToken,
    generateRefreshToken,
    getRefreshTokens,
    getRefreshToken,
    revokeToken,
    setTokenCookie
} = require('../services/authService')

const signIn = async (req, res) => {
    try {
        const username      = req.query.username ? req.query.username : (req.body.username ? req.body.username : req.params.username);
        const password      = req.query.password ? req.query.password : (req.body.password ? req.body.password : req.params.password);

        const user = await User.findOne({ uname: username })

        // Check if user exist and password is valid
        if (!user || !bcrypt.compareSync(password, user.password)) {
            console.log(new Error('Username or password is incorrect'))
            res.status(400).send('Username or Password Incorrect')
        }

        // authentication successful so generate jwt and refresh tokens
        const jwtToken      = generateJwtToken(user) // Generate Access Token
        const refreshToken  = generateRefreshToken(user) // Generate Refresh Token

        // save refresh token
        await refreshToken.save()

        // return basic details and tokens
        const resData = { 
            data: {
                username: user.uname,
                name: user.name,
                email: user.email
            },
            accessToken : jwtToken,
            refreshToken: refreshToken.token
        }

        setTokenCookie(res, refreshToken.token)
        res.status(200).json(resData)
    } catch (error) {
        if (error) throw error
        res.status(400).json('error')
    }
    
}

const signUp = async (req, res) => {
    try {
        const uname             = req.body.username
        const name              = req.body.name
        const email             = req.body.email
        const password          = req.body.password
        const passwordHashed    = await bcrypt.hash(password, 8)

        const dataBody = {
            uname: uname,
            name: name,
            email: email,
            password: passwordHashed,
            role: 'admin'
        }

        User.create(dataBody)
        .then(data => {
            res.status(201).json({ status: 'Success', code: 200, 'msg': 'SignUp Success!', data: data})
        })
        .catch(err => {
            console.log(new Error(err))
            if (err.code === 11000) {
                res.status(500).json({ status: 'error', code: 400, 'msg' : 'Username already exist!' })
            } else {
                res.status(500).json({ status: 'error', code: 400, 'msg' : 'Failed to saving data!' })
            }
        })
    } catch (error) {
        console.log(error);
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
        res.status(400).json(data);
    }
    
}

const profile = async (req, res) => {
    const id    = req.userId
    
    try {
        User.findById({ _id: id }).then((user) => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ status: 'Error', code: 404, msg: 'User Not Found!'})
            }            
        }).catch((err) => {
            res.status(400).json({ status: 'Error', code: 500, msg: 'Internal Server Error' })
            console.log(new Error(err))
        })
    } catch (error) {
        res.status(400).json({ status: 'Error', code: 500, msg: 'Internal Server Error' })
        console.log(new Error(err))
    }
}

const signOut = async (req, res) => {
    const token = req.body.token || req.cookies.refreshToken

    if (!token) return res.status(400).json({ message: 'Token is required!' })

    revokeToken({ token })
        .then(() => {
            res.status(200).json({ status: 'Success', mgs: 'Token Revoked' })
        })
        .catch(err => {
            console.log(new Error(err))
            res.status(500).json({ status: 'Error', mgs: err})
        })
}

const getTokens = async (req, res) => {
    getRefreshTokens(req.userId)
        .then(tokens => {
            res.json(tokens)
        })
        .catch(err => {
            console.log(new Error(err))
            res.send('error')
        })
}

module.exports = {
    signIn,
    signUp,
    signOut,
    profile,
    getTokens
}