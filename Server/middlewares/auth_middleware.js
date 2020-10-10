const jwt               = require('jsonwebtoken') // Import jwt
const env               = require('../env') // Import environment var
const secret            = env.token_secret // Get Token Secret from env var
const { 
    refreshToken,
    setTokenCookie
}  = require('../services/authService') // Get auth function

// Start Auth Middlewares
const authMiddleware = async (req, res, next) => {
    try {
        res.setHeader( 'X-Powered-By', 'Setara Daring' ) // Set X Power Header

        const token     = req.header('Authorization').replace('Bearer ','') // Get token from Authorization header
        const decoded   = jwt.verify(token, secret) // Verifying and Decoding jwt payload

        if (!decoded) {
            res.status(406).json({ status: 'Not Acceptable', code: 406, msg: "Invalid Access Token Request."}) // If token not verified
        } else {
            // If verified create new request header
            req.token    = token
            req.userId   = decoded.id
            req.username = decoded.username
            req.role     = decoded.roles

            next() // Send to routing
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // If token is expires
            const token = req.cookies.refToken ? req.cookies.refToken : '' // Get refresh token from cookie

            refreshToken({ token }) // Create new token and refresh token
                .then((tokenData) => {
                    // If creating token success
                    setTokenCookie(res, tokenData.refreshToken) // Set refreshtoken to cookie
                        .then(() => {
                            res.status(200).json(tokenData) // Send Token and RefreshToken to front end
                        })
                        .catch(err => { // If set cookie failed
                            console.log(new Error(err))
                            res.status(500).send('Internal Server Error')
                        })
                })
                .catch(err => { // If create new token and refresh token error
                    console.log(new Error(err))
                    res.status(404).json({ status: 'Error', message: err })
                })
        } else { // If any error
            console.log(new Error(err))
            res.status(500).json({ status: error.name, code: 406, msg: error.message})
        }
    }
}
// End Auth middlewares

module.exports = authMiddleware // Exports Auth Middlewares function