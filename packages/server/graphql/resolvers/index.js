import queryResolvers from './queryResolvers'
import mutationResolvers from './mutationResolvers'

export default {
	Query: {
		getWords: queryResolvers.getWords,
		getMicrosoft: queryResolvers.getMicrosoft
	},
	Mutation: {
		addWord: mutationResolvers.addWord
	}
}
