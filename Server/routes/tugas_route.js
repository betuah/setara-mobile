const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const tugasController = require('../controllers/tugas_controller') // Import Materi Controller

module.exports = (app) => {

    app.route('/api/v1/tugas/:mapelId')
        .get(authMiddleware, tugasController.getListTugas)
    app.route('/api/v1/tugas/detail/:tugasId')
        .get(authMiddleware, tugasController.getTugasDetail)
}
