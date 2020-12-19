const authMiddleware = require('../middlewares/auth_middleware') // Import Auth Middlewares
const uploadPhotoMiddleware = require('../middlewares/uploadPhoto_Middleware') // Import Upload Photo Middleware
const userController = require('../controllers/user_controller') // Import User Controller
const authController = require('../controllers/auth_controller')

module.exports = (app) => {

    app.route('/api/v1/profile') // Get Profile End Point
        .get(authMiddleware, userController.profile) // Set Middleware

    app.route('/api/v1/profile') // Edit Profile End Point
        .put(authMiddleware, userController.setProfile) // Set Middleware
    
    app.route('/api/v1/profile/avatar') // Get Profile End Point
        .post(authMiddleware, uploadPhotoMiddleware, userController.avatarUpload) // Set Middleware

    app.route('/api/v1/profile/resetPass')
        .put(authMiddleware, authController.resetPassword)

}
