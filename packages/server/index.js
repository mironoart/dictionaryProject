var admin = require('firebase-admin')
var serviceAccount = require('./ServiceAccountSettings.json')
import { GraphQLServer } from 'graphql-yoga'
import 'dotenv/config' // same as require('dotenv').config()
import router from './utils/auth'
import schema from './graphql'
import passport from 'passport'

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})
admin.firestore().settings({ timestampsInSnapshots: true }) // Supposedly doing something with storing a !date!

const server = new GraphQLServer({
	schema,
	context: req => req
})

server.express.use(passport.initialize())
server.express.use('/auth', router)

server.start({ playground: '/pg' }, () =>
	console.log('Server is running on localhost:4000')
)
