const authMiddleware = require('../middlewares/auth_middleware')
const Auth = require('../controllers/auth_controller')

module.exports = (app) => {
    
    app.route('/api/v1/signin')
        .post(Auth.signIn)
    
    app.route('/api/v1/signup')
        .post(Auth.signUp)

    app.route('/api/v1/signout')
        .post(authMiddleware, Auth.signOut)
    
    app.route('/api/v1/account')
        .get(authMiddleware, Auth.account)

    app.route('/api/v1/refresh-tokens')
        .get(authMiddleware, Auth.getTokens)
}