import queryResolvers from './queryResolvers'
import mutationResolvers from './mutationResolvers'

export default {
	Query: {
		getWords: queryResolvers.getWords,
		getMicrosoft: queryResolvers.getMicrosoft,
		getExamples: queryResolvers.getExamples,
		getImages: queryResolvers.getImages
	},
	Mutation: {
		addWord: mutationResolvers.addWord
	}
}
