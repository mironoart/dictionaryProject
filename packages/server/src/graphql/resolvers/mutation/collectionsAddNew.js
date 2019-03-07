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
		let isCollectionExists = false
		try {
			userId = authCheck(ctx)
		} catch (error) {
			throw error
		}
		await db(userId)
			.getCollections()
			.then(collections => {
				collections.map(collection => {
					if (collection.id === collectionName) {
						isCollectionExists = true
					}
				})
			})
		if (!isCollectionExists) {
			await db(userId)
				.collection(collectionName)
				.add({
					id: uuid()
				})
		} else return 'Exist'
		console.log('Added New collection')
		return 'Added'
	}
}
