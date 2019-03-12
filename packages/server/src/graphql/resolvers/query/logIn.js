var admin = require('firebase-admin')
import jwt from 'jsonwebtoken'

const db = email => {
	return admin
		.firestore()
		.collection('Users')
		.doc(email)
}

export default {
	logIn: async (_, { email, password }) => {
		let response = []

		await db(email)
			.get()
			.then(snap => {
				console.log()

				if (!snap.exists) {
					console.log('No_such_email')
					response = [
						{
							error: 'No_such_email'
						}
					]
					return response
				}

				if (snap.data().info.password !== password) {
					console.log('Incorrect password')
					response = [
						{
							error: 'Incorrect_password'
						}
					]
					return response
				} else {
					response = [
						{
							lengDirection: snap.data().config.lengDirection,
							quantityOfWords: snap.data().config.quantityOfWords,
							email: snap.data().info.email,
							image: snap.data().info.image,
							username: snap.data().info.username,
							token: jwt.sign(email, process.env.COOKIE_KEY)
						}
					]

					console.log(response)
					return response
				}
			})
		return response
	}
}
