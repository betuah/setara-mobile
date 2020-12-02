const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const materiController = require('../controllers/materi_controller') // Import Materi Controller

module.exports = (app) => {

    app.route('/api/v1/materi/:mapelId')
        .get(authMiddleware, materiController.getMateri)

}
