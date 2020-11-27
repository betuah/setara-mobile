const middleware = require('../middlewares/auth_middleware') // Import Middlewares
const classController = require('../controllers/class_controller') // Import Auth Controller

module.exports = (app) => {

    app.route('/api/v1/class') 
        .get(classController.getAllClass)
    
    app.route('/api/v1/class/:classId') 
        .get(classController.getDetailClass)
}