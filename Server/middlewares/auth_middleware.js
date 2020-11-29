const jwt               = require('jsonwebtoken') // Import jwt
const env               = require('../env') // Import environment var
const secret            = env.token_secret // Get Token Secret from env var

// Start Auth Middlewares
const authMiddleware = async (req, res, next) => {
    try {
        res.setHeader( 'X-Powered-By', 'Setara Daring' ) // Set X Power Header

        const token     = req.header('Authorization').replace('Bearer ','') // Get token from Authorization header
        console.log(token)
        const decoded   = jwt.verify(token, secret) // Verifying and Decoding jwt payload

        if (!decoded) {
            res.status(406).json({ status: 'Not Acceptable', code: 'ERR_INVALID_TOKEN', message: "Invalid Access Token Request."}) // If token not verified
        } else {
            // If verified create new request header
            req.token    = token
            req.userId   = decoded.id
            req.username = decoded.username
            req.status   = decoded.status

            next() // Send to routing
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // If token is expires
            res.status(406).json({status: 'TokenExpiredError', code: 'ERR_TOKEN_EXPIRED', message: 'Token sudah kadaluarsa.' })
        } else { // If any error
            console.log(new Error(error))
            res.status(500).json({ status: error.name, code: error.name, message: error.message})
            // res.status(406).json({ status: 'Not Acceptable', code: 'ERR_AUTH_TOKEN', message: "Invalid Authentication."})
        }
    }
}
// End Auth middlewares

module.exports = authMiddleware // Exports Auth Middlewares function