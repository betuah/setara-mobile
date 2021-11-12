const authMiddleware = require('../middlewares/auth_middleware') // Import Middlewares
const soalController = require('../controllers/soal_controller') // Import Mapel Controller

module.exports = (app) => {

    app.route('/api/v1/quiz/:mapelId')
        .get(authMiddleware, soalController.getListQuiz)

    app.route('/api/v1/quiz/detail/:quizId')
        .get(authMiddleware, soalController.getQuizDetail)

    app.route('/api/v1/quiz/paket/:paketId')
        .get(authMiddleware, soalController.getPaketSoal)
    
    app.route('/api/v1/quiz/:quizId')
        .post(authMiddleware, soalController.jawabanQuiz)

}
