import queryResolvers from './queryResolvers'
import mutationResolvers from './mutationResolvers'

export default {
	Query: {
		getWords: queryResolvers.getWords,
		getMicrosoft: queryResolvers.getMicrosoft,
		getExamples: queryResolvers.getExamples
	},
	Mutation: {
		addWord: mutationResolvers.addWord
	}
}
