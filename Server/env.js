require('dotenv').config();

const env = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    token_secret: process.env.TOKEN_SECRET,
    httpsPrivateKey: process.env.HTTPS_PRIVATE_KEY_PATH,
    httpsCertificate: process.env.HTTPS_CERTIFICATE_PATH,
    host: process.env.HOST,
    path_protocol: process.env.PATH_PROTOCOL,
    picture_path: process.env.PICTURE_PATH,
    mongoDB: {
        databaseLms: {
            username: process.env.MONGO_USERNAME_LMS,
            password: process.env.MONGO_PASSWORD_LMS,
            db: process.env.MONGO_DB_LMS,
        },
        databaseLog: {
            username: process.env.MONGO_USERNAME_LOG,
            password: process.env.MONGO_PASSWORD_LOG,
            db: process.env.MONGO_DB_LOG,
        },
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    }
}

module.exports = env