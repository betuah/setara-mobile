// Start Import used libary
const express       = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    helmet          = require('helmet'),
    cookieParser    = require('cookie-parser'),
    cors            = require('cors'),
    env             = require('./env'),
    fs              = require("fs"),
    https           = require('https'),
    port            = env.port || 8000 // Set custom Port
// End Import library

app.use(helmet()) // User helmet for basic security
app.disable("x-powered-by") // Disable X Powered header
app.use(bodyParser.urlencoded({ extended: true })) // Url Encoded
app.use(bodyParser.json()) // Body Json
app.use(bodyParser.raw()) // Body Raw

app.use('/public', express.static(__dirname + '/public')) // Set public directory

/* Start Cookie Settings */
app.use(cookieParser())
/* End Cookie Settings */

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

/* Start of Routing Import */
const authRoute   = require('./routes/auth_route')
const classRoute  = require('./routes/class_route')
const materiRoute = require('./routes/materi_route')
const tugasRoute  = require('./routes/tugas_route')
const postRoute   = require('./routes/post_route')
const userRoute   = require('./routes/user_route')
const notifRoute   = require('./routes/notif_route')

authRoute(app)
classRoute(app)
materiRoute(app)
tugasRoute(app)
postRoute(app)
userRoute(app)
notifRoute(app)

/* End of Routing Import */

/* MongoDB Connection Check and running Apps */
const { mongoConn } = require('./config/db_mongoDB') // Import mongo connection from config

mongoConn.then(() => // If mongodb Connected to the host server
    {
        // if (env.node_env === 'production') { // If Node Env set to production
        //     try {
        //         // If production set https
        //         const privateKey  = fs.readFileSync(`${env.httpsPrivateKey}`, 'utf8')
        //         const certificate = fs.readFileSync(`${env.httpsCertificate}`, 'utf8')
        //         const credentials = {key: privateKey, cert: certificate}
        //         const httpsApps   = https.createServer(credentials, app)
        //
        //         httpsApps.listen(port, () => console.log(`Production Server API listen on ${env.host}:${env.port}`)) // listen port https
        //     } catch (error) {
        //         console.log(new Error(error))
        //     }
        // } else {
        //     // If env set to development
        //     app.listen(port, () => console.log(`Development Server API listen on ${env.host}:${env.port}`)) // Listen port http
        // }

        app.listen(port, () => console.log(`Development Server API listen on ${env.host}:${env.port}`)) // Listen port http
    }
).catch(err => {
    console.log(`${env.host}:${env.port} cannot connect to MongoDB! : ` + err)
})
/* End MongoDB Connection Check and Running Apps*/
