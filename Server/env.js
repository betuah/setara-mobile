require('dotenv').config();

const env = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    httpsPrivateKey: process.env.HTTPS_PRIVATE_KEY_PATH,
    httpsCertificate: process.env.HTTPS_CERTIFICATE_PATH,
    host: process.env.HOST,
    db_mongoDB: {
        database: process.env.MONGO_DB,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT
    }    
};
   
module.exports = env;
  