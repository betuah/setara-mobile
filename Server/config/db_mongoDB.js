const mongoose  = require('mongoose');
const env       = require('../env');

// Lms Mongo Connection
const mongoConnLms = mongoose.createConnection(`mongodb://${env.mongoDB.host}:${env.mongoDB.port}/${env.mongoDB.databaseLms.db}`, {
    auth: { "authSource": "admin" }, // Auth db
    user: env.mongoDB.databaseLms.username, // MongoDB LMS Server username
    pass: env.mongoDB.databaseLms.password, // MongoDB LMS Server password
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true // Auth indexing schema
});

// Log Mongo Connection
const mongoConnLog = mongoose.createConnection(`mongodb://${env.mongoDB.host}:${env.mongoDB.port}/${env.mongoDB.databaseLog.db}`, {
    auth: { "authSource": "admin" }, // Auth db
    user: env.mongoDB.databaseLog.username, // MongoDB LOG Server username
    pass: env.mongoDB.databaseLog.password, // MongoDB LOG Server password
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true // Auth indexing schema
}).catch(e => {
    console.log('Database connection log_lms', new Error(e))
});

/**
 * Checking Object ID
 * @param {OjectId} id 
 */
const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}
// End checking object id

module.exports = { mongoConnLms, mongoConnLog, isValidId } // Export mongo connection and isValidId function