'use strict'

const Search = require('azure-cognitiveservices-imagesearch')
const CognitiveServicesCredentials = require('ms-rest-azure')
	.CognitiveServicesCredentials

let serviceKey = process.env.MICROSOFT_SEARCH_KEY_1

const credentials = new CognitiveServicesCredentials(serviceKey)
let imageSearchApiClient = new Search(credentials)

const getArrOfImages = async word => {
	const imageResults = await imageSearchApiClient.imagesOperations.search(word)
	const arr = imageResults.value.map((item, index) => {
		return {
			index: index,
			img: item.thumbnailUrl
		}
	})
	return arr
}

export default getArrOfImages
