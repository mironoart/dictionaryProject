const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
var admin = require('firebase-admin')

const db = email => {
	return admin
		.firestore()
		.collection('Users')
		.doc(email)
}

//serializing and sending to the browser
passport.serializeUser((user, done) => {
	console.log('serialize')
	done(null, user.info.email)
})

//deserializing when resiving from browser
passport.deserializeUser((email, done) => {
	console.log('deserialize')

	db(email)
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
			const userdata = profile._json
			const email = userdata.emails[0].value

			db(email)
				.get()
				.then(docSnapshot => {
					const newUser = {
						info: {
							username: userdata.name.givenName,
							image: userdata.image.url,
							email: email
						},
						config: {
							quantityOfWords: 30,
							lengDirection: 'straight'
						}
					}
					if (!docSnapshot.exists) {
						// If user not exist -> creating new one
						db(email).create(newUser)
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
