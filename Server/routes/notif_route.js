const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const notifController = require('../controllers/notif_controller') // Import Notif Controller

module.exports = (app) => {

    app.route('/api/v1/notification')
        .get(authMiddleware, notifController.getAllNotif)

    app.route('/api/v1/notification/read')
        .put(authMiddleware, notifController.readNotif)
        
}
