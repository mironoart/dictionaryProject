var admin = require('firebase-admin')

const db = email => {
	return admin
		.firestore()
		.collection('Users')
		.doc(email)
}

export default {
	signUp: async (_, { username, email, password }) => {
		let isCreated = false
		db(email)
			.get()
			.then(docSnapshot => {
				const newUser = {
					info: {
						username: username,
						image: '',
						email: email,
						password: password
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
				} else {
					console.log('exist')
				}
			})
		return [{ created: isCreated }]
	}
}
