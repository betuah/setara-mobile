const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const Auth = require('../controllers/auth_controller') // Import Auth Controller

module.exports = (app) => {

    app.route('/api/v1') // SingIn End Point
        .get(Auth.index) // Bypass Auth Middleware
    
    app.route('/api/v1/signin') // SingIn End Point
        .post(Auth.signIn) // Bypass Auth Middleware
    
    app.route('/api/v1/signup') // SIgnUp End Point
        .post(Auth.signUp) // Bypass Auth Middleware
    
    app.route('/api/v1/token') // Generate New Token
        .get(Auth.generateNewToken) // Bypass Auth Middleware

    app.route('/api/v1/signout') // SignOut End Point
        .post(authMiddleware, Auth.signOut) // Set middleware
    
    app.route('/api/v1/account') // Get Profile End Point
        .get(authMiddleware, Auth.account) // Set Middleware

}