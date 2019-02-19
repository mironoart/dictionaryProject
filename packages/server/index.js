var admin = require('firebase-admin')
var serviceAccount = require('./ServiceAccountSettings.json')
import { GraphQLServer } from 'graphql-yoga'
import cookieSession from 'cookie-session'
import 'dotenv/config' // same as require('dotenv').config()
import router from './routes/auth'
import schema from './graphql/schema'
import passport from 'passport'
import cors from 'cors'

// initializing firebase
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})
admin.firestore().settings({ timestampsInSnapshots: true }) // Supposedly doing something with storing a !date!

//setting up server
const server = new GraphQLServer({ schema })
const corsOptions = {
	credentials: true
}
server.express.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: process.env.COOKIE_KEY // key for decripting cookie -- jast make up anything
	})
)

server.express.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})
server.express.use(cors(corsOptions))
server.express.use(passport.initialize())
server.express.use(passport.session())
server.express.use('/auth', router)
require('./configs/passport-setup')

server.start({ playground: '/pg' }, () =>
	console.log('Server is running on localhost:4000')
)
