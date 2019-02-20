import queryResolvers from './queryResolvers'
import mutationResolvers from './mutationResolvers'

export default {
	Query: {
		getWords: queryResolvers.getWords,
		getMicrosoft: queryResolvers.getMicrosoft,
		getExamples: queryResolvers.getExamples,
		getImages: queryResolvers.getImages,
		getCollections: queryResolvers.getCollections,
		getCollectionsData: queryResolvers.getCollectionsData
	},
	Mutation: {
		addWord: mutationResolvers.addWord,
		addToUserCollection: mutationResolvers.addToUserCollection
	}
}
