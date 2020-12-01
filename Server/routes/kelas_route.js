const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const Kelas = require('../controllers/kelas_controller') // Import Kelas Controller

module.exports = (app) => {

    app.route('/api/test') // Test Point
        .get(Kelas.index) // Bypass Auth Middleware

    app.route('/api/kelas') // Kelas End Point
        .get(authMiddleware, Kelas.daftarKelas) // Set middleware
}
