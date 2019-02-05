var admin = require('firebase-admin')
import getArrOfTranslations from '../utils/getArrOfTranslations'

const db = (language, word) => {
	return admin
		.firestore()
		.collection(language)
		.doc(word)
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
	}
}
