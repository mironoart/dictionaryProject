var admin = require('firebase-admin')
import authCheck from '../../utils/authCheck'

const db = id => {
	return admin
		.firestore()
		.collection('Users')
		.doc(id)
}
export default {
	updateCollectionWordInfo: async (_, { collection, id, time }, ctx) => {
		let userId
		try {
			userId = authCheck(ctx)
		} catch (error) {
			throw error
		}
		await db(userId)
			.collection(collection)
			.doc(id)
			.update({
				time: time
			})

		console.log('Word Info Updated!')
		return 'Updated'
	}
}
