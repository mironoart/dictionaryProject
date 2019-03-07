import translate from './microsoftTranslate'

const getArrOfExamples = async (from, to, text, endpoint, translation) => {
	// Getting most neede info from response:
	console.log(from, to, text, endpoint, translation)

	const res = await translate(from, to, text, endpoint, translation)
	const arrOfExamples = res.examples.map(item => ({
		fromSentence: item.sourcePrefix + item.sourceTerm + item.sourceSuffix,
		toSentence: item.targetPrefix + item.targetTerm + item.targetSuffix
	}))

	return arrOfExamples
}
export default getArrOfExamples
