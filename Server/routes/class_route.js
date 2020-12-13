const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const classController = require('../controllers/class_controller') // Import Mapel Controller

module.exports = (app) => {

    app.route('/api/v1/class')
        .get(authMiddleware, classController.getAllClass)

    app.route('/api/v1/class/detail/:classId')
        .get(authMiddleware, classController.getDetailClass)

    app.route('/api/v1/class/join')
        .post(authMiddleware, classController.joinClass)

    app.route('/api/v1/post/')
        .get(authMiddleware, classController.getAllPosting)

    app.route('/api/v1/post/class/:classId')
        .get(authMiddleware, classController.getPosting)

    app.route('/api/v1/post/detail/:postingId')
        .get(authMiddleware, classController.getDetailPosting)
}
