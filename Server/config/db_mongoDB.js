const mongoose  = require('mongoose');
const env       = require('../env');

const mongoConn = new Promise((resolve, reject) => { 
    mongoose.connect(`mongodb://${env.db_mongoDB.host}:${env.db_mongoDB.port}/${env.db_mongoDB.database}`, {
        auth: { "authSource": "admin" },
        user: env.db_mongoDB.username,
        pass: env.db_mongoDB.password,
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: true
    }).then(() => {
        return resolve(true)
    }).catch((e) => {
        console.log(new Error(e))
        return reject(false)
    })
})

const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = { mongoConn, isValidId }