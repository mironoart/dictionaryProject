var admin = require('firebase-admin')
import { v4 as uuid } from 'uuid'

const db = (language, word) => {
	return admin
		.firestore()
		.collection(language)
		.doc(word)
}
export default {
	addWord: async (_, { language, word, translatedWord, partOfSpeech }) => {
		const id = uuid()
		console.log(language, word, translatedWord, partOfSpeech)
		// Making new word in DB
		db(language, word)
			.get()
			.then(docSnapshot => {
				if (!docSnapshot.exists) {
					// If word not exist -> creating new one
					db(language, word).create({
						id: id,
						word: word,
						translations: [
							{
								translatedWord: translatedWord,
								partOfSpeech: partOfSpeech,

								userFrequency: 0
							}
						]
					})
				} else {
					// If word exist -> updating it
					const translationsArr = docSnapshot.data().translations
					let updatedObjects = []
					let notUpdatedObjects = []
					// Splitting objects into 2 arrays:
					// First -> array with updated word,
					// Second -> array with not updated words
					translationsArr.forEach(obj => {
						if (obj.translatedWord === translatedWord) {
							updatedObjects.push({
								translatedWord: obj.translatedWord,
								partOfSpeech: obj.partOfSpeech,
								userFrequency: obj.userFrequency + 1
							})
						} else notUpdatedObjects.push(obj)
					})
					// Updating words:
					// if no updates executed then just adding new word to the array
					if (updatedObjects.length == 0) {
						notUpdatedObjects.push({
							translatedWord: translatedWord,
							partOfSpeech: partOfSpeech,
							userFrequency: 0
						})
						db(language, word).update({
							id: id,
							word: word,
							translations: notUpdatedObjects
						})
					}
					// if was updates -> updating array with old words and updated ones
					else {
						const sumArr = [...notUpdatedObjects, ...updatedObjects]
						db(language, word).update({
							id: id,
							word: word,
							translations: sumArr
						})
					}
				}
			})
		console.log('Good')
		return 'Good'
	}
}
