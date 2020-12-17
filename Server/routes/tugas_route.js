const authMiddleware = require('../middlewares/auth_middleware') // Import Auth Middlewares
const uploadMiddleware = require('../middlewares/uploadFile_middleware') // Import Files Middlewares

const tugasController = require('../controllers/tugas_controller') // Import Materi Controller

module.exports = (app) => {

    app.route('/api/v1/tugas/:mapelId')
        .get(authMiddleware, tugasController.getListTugas)

    app.route('/api/v1/tugas/detail/:tugasId')
        .get(authMiddleware, tugasController.getTugasDetail)

    app.route('/api/v1/tugas/:tugasId')
        .post(authMiddleware, uploadMiddleware, tugasController.kumpulkanTugas)
}
