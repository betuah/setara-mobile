const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const userController = require('../controllers/user_controller') // Import User Controller

module.exports = (app) => {

    app.route('/api/v1/profile') // Get Profile End Point
        .get(authMiddleware, userController.profile) // Set Middleware

    app.route('/api/v1/profile') // Edit Profile End Point
        .put(authMiddleware, userController.setProfile) // Set Middleware
        
}
