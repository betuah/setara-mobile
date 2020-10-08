const jwt               = require('jsonwebtoken')
const env               = require('../env')
const secret            = env.token_secret
const { 
    refreshToken,
    setTokenCookie
}  = require('../services/authService')

const authMiddleware = async (req, res, next) => {
    try {
        res.setHeader( 'X-Powered-By', 'Setara Daring' )

        const token     = req.header('Authorization').replace('Bearer ','')
        const decoded   = jwt.verify(token, secret)

        if (!decoded) {
            res.status(406).json({ status: 'Not Acceptable', code: 406, msg: "Invalid Access Token Request."})
        } else {
            req.token    = token
            req.userId   = decoded.id
            req.username = decoded.username
            req.role     = decoded.roles

            next()
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const token = req.cookies.refToken
            refreshToken({ token })
                .then((tokenData) => {
                    setTokenCookie(res, token)
                        .then(() => {
                            res.status(200).json(tokenData)
                        })
                        .catch(err => {
                            console.log(new Error(err))
                            res.status(500).send('Internal Server Error')
                        })
                })
                .catch(err => {
                    console.log(new Error(err))
                    res.status(404).json({ status: 'Error', message: err })
                })
        } else {
            console.log(new Error(err))
            res.status(500).json({ status: error.name, code: 406, msg: error.message})
        }
    }
}

module.exports = authMiddleware;