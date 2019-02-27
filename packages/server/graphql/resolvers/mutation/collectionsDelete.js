var admin = require('firebase-admin')
import { v4 as uuid } from 'uuid'
import authCheck from '../../utils/authCheck'

const db = id => {
	return admin
		.firestore()
		.collection('Users')
		.doc(id)
}
export default {
	addNewCollection: async (_, { collectionName }, ctx) => {
		let userId
		try {
			userId = authCheck(ctx)
		} catch (error) {
			throw error
		}

		await db(userId)
			.collection(collectionName)
			.add({
				id: uuid()
			})

		console.log(`${collectionName} have been DELETED`)
		return 'DELETED'
	}
}
