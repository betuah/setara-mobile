const express       = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    helmet          = require('helmet'),
    cookieParser    = require('cookie-parser'),
    cors            = require('cors'),
    env             = require('./env'),
    fs              = require("fs"),
    https           = require('https'),
    port            = env.port || 8000

app.use(helmet())
app.disable("x-powered-by")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/public', express.static(__dirname + '/public')) // Set public directory

/* Start Cookie Settings */
app.use(cookieParser())
/* End Cookie Settings */

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

/* Start of Routing Import */
const authRoute        = require('./routes/auth_route')

authRoute(app)
/* End of Routing Import */

/* MongoDB Connection Check */
const { mongoConn } = require('./config/db_mongoDB')

mongoConn.then(() => 
    {
        if (env.node_env === 'production') {
            console.log('er')
            try {
                const privateKey  = fs.readFileSync(`${env.httpsPrivateKey}`, 'utf8')
                const certificate = fs.readFileSync(`${env.httpsCertificate}`, 'utf8')
                const credentials = {key: privateKey, cert: certificate}
                const httpsApps   = https.createServer(credentials, app)
        
                httpsApps.listen(port, () => console.log(`Production Server API listen on ${env.host}:${env.port}`))
            } catch (error) {
                console.log(new Error(error))
            }
        } else {
            app.listen(port, () => console.log(`Development Server API listen on ${env.host}:${env.port}`))
        }
    }
).catch(err => {
    console.log(`${env.host}:${env.port} cannot connect to MongoDB!`)
})

/* End MongoDB Connection Check */