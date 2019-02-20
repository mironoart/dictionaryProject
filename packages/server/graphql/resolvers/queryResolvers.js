var admin = require('firebase-admin')
import getArrOfTranslations from '../utils/getArrOfTranslations'
import getArrOfExamples from '../utils/getArrOfExamples'
import getArrOfImages from '../utils/getArrOfImages'
import authCheck from '../utils/authCheck'

const db = (language, word) => {
	return admin
		.firestore()
		.collection(language)
		.doc(word)
}
const dbUser = id => {
	return admin
		.firestore()
		.collection('Users')
		.doc(id)
}

export default {
	getWords: async (_, { language, word }) => {
		const snapshot = await db(language, word).get()
		const snapshotData = snapshot.data()
		let arrOfAllTranslations = []

		if (snapshotData === undefined) {
			return [
				{
					translatedWord: 'Not finded...'
				}
			]
		} else {
			snapshotData.translations.forEach(obj => {
				arrOfAllTranslations.push({
					microsoftFrequency: obj.microsoftFrequency,
					partOfSpeech: obj.partOfSpeech,
					translatedWord: obj.translatedWord,
					userFrequency: obj.userFrequency
				})
			})
			return arrOfAllTranslations
		}
	},

	getMicrosoft: async (_, { from, to, word }) => {
		const arr = await getArrOfTranslations(from, to, word, 'lookup')
		console.log(arr[0])
		return arr
	},

	getExamples: async (_, { from, to, word, translation }) => {
		const arr = await getArrOfExamples(from, to, word, 'examples', translation)
		console.log(arr[0])
		return arr
	},

	getImages: async (_, { word }) => {
		const arr = await getArrOfImages(word)
		console.log(arr[0])
		return arr
	},
	getCollections: async (_, __, ctx) => {
		let userId
		try {
			userId = authCheck(ctx)
		} catch (error) {
			throw error
		}
		let collectionsId = []
		await dbUser(userId)
			.getCollections()
			.then(collections => {
				collections.forEach(collection => {
					collectionsId.push({ id: collection.id })
				})
			})
		console.log(collectionsId)
		return collectionsId
	},
	getCollectionsData: async (_, { collectionName }, ctx) => {
		let userId
		try {
			userId = authCheck(ctx)
		} catch (error) {
			throw error
		}
		let collectionData = []
		await dbUser(userId)
			.collection(collectionName)
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					collectionData.push({
						word: doc.data().word,
						translations: doc.data().translations,
						sentences: doc.data().sentences,
						image: doc.data().image,
						time: doc.data().time
					})
				})
			})
		console.log('Good Returned')
		return collectionData
	}
}
