var admin = require('firebase-admin')
var serviceAccount = require('../ServiceAccountSettings.json')
import { GraphQLServer } from 'graphql-yoga'
import 'dotenv/config' // same as require('dotenv').config()
import router from './utils/auth'
import schema from './graphql'
import passport from 'passport'
import cors from 'cors'

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})
admin.firestore().settings({ timestampsInSnapshots: true }) // Supposedly doing something with storing a !date!

const server = new GraphQLServer({
	schema,
	context: req => req
})

server.express.use(cors())
server.express.use(passport.initialize())
server.express.use('/auth', router)

server.get('/successCheck', (req, res) => {
	res.status(200).json({ message: 'Welcome to Node.js & Express' })
})
const port = process.env.PORT || 4000
server.start({ playground: '/pg', port: port }, () =>
	console.log(`Server is running on port:${port}`)
)
