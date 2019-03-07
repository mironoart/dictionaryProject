var admin = require('firebase-admin')
import authCheck from '../../utils/authCheck'

const db = id => {
	return admin
		.firestore()
		.collection('Users')
		.doc(id)
}
export default {
	deleteWord: async (_, { collectionName, word }, ctx) => {
		let userId
		try {
			userId = authCheck(ctx)
		} catch (error) {
			throw error
		}
		let docId
		await db(userId)
			.collection(collectionName)
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					if (doc.data().word === word) docId = doc.data().id
				})
			})

		await db(userId)
			.collection(collectionName)
			.doc(docId)
			.delete()

		console.log(`${word} from ${collectionName} deleted!`)
		return 'deleted'
	}
}
