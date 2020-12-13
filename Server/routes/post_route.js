const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const postController = require('../controllers/post_controller') // Import Mapel Controller

module.exports = (app) => {

    app.route('/api/v1/post/')
        .get(authMiddleware, postController.getAllPosting)

    app.route('/api/v1/post/class/:classId')
        .get(authMiddleware, postController.getPosting)

    app.route('/api/v1/post/detail/:postingId')
        .get(authMiddleware, postController.getDetailPosting)
}
