import translate from './microsoftTranslate'

const getArrOfTranslations = async (from, to, text, endpoint, translation) => {
	// Getting most neede info from response:
	const res = await translate(from, to, text, endpoint, translation)
	const arrOftranslations = res.translations.map(item => ({
		translatedWord: item.displayTarget,
		partOfSpeech: item.posTag,
		confidence: item.confidence
	}))
	return arrOftranslations
}
export default getArrOfTranslations
