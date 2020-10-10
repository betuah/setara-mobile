const mongoose  = require('mongoose');
const env       = require('../env');

const mongoConn = new Promise((resolve, reject) => { // Set promise
    mongoose.connect(`mongodb://${env.db_mongoDB.host}:${env.db_mongoDB.port}/${env.db_mongoDB.database}`, { // Mongodb URL Connect
        auth: { "authSource": "admin" }, // Auth db
        user: env.db_mongoDB.username, // MongoDB Server username
        pass: env.db_mongoDB.password, // MongoDB Server password
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: true // Auth indexing schema
    }).then(() => {
        return resolve(true) // If success send resolve
    }).catch((e) => {
        console.log(new Error(e))
        return reject(false) // If error rejected
    })
})

/**
 * Checking Object ID
 * @param {OjectId} id 
 */
const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}
// End checking object id

module.exports = { mongoConn, isValidId } // Export mongo connection and isValidId function