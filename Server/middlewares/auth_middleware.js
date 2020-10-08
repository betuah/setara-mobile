const jwt       = require('jsonwebtoken')
const env       = require('../env')
const secret    = env.token_secret

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
        console.log(error)

        if (error.name === 'TokenExpiredError') {
            res.send('test')
        } else {
            res.status(500).json({ status: error.name, code: 406, msg: error.message})
        }
    }
}

module.exports = authMiddleware;