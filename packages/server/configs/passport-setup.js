const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
var admin = require('firebase-admin')

const db = id => {
	return admin
		.firestore()
		.collection('Users')
		.doc(id)
}

//serializing and sending to the browser
passport.serializeUser((user, done) => {
	console.log('serialize')
	done(null, user.id)
})

//deserializing when resiving from browser
passport.deserializeUser((id, done) => {
	console.log('deserialize')

	db(id)
		.get()
		.then(snapShot => {
			const user = snapShot.data()
			done(null, user)
		})
})

passport.use(
	new GoogleStrategy(
		{
			// options
			callbackURL: '/auth/google/redirect',
			clientID: process.env.GOOGLE_PLUS_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_PLUS_OAUTH_SECRET_KEY
		},
		(accessToken, refreshToken, profile, done) => {
			// third
			console.log('done')
			const userdata = profile._json
			const id = userdata.id

			db(id)
				.get()
				.then(docSnapshot => {
					const newUser = {
						id: id,
						username: userdata.name.givenName,
						image: userdata.image.url
					}
					if (!docSnapshot.exists) {
						// If user not exist -> creating new one
						db(id).create(newUser)
						console.log('created')
						done(null, newUser)
					} else {
						console.log('exist')
						done(null, docSnapshot.data())
					}
				})
		}
	)
)
