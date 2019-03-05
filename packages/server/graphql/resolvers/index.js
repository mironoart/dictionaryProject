import queryResolvers from './queryResolvers'
import mutationResolvers from './mutationResolvers'
import collectionsAddNew from './mutation/collectionsAddNew'
import deleteWord from './mutation/deleteWord'
import updateCollectionWordInfo from './mutation/collectionsUpdateWord'

export default {
	Query: {
		getWords: queryResolvers.getWords,
		getMicrosoft: queryResolvers.getMicrosoft,
		getExamples: queryResolvers.getExamples,
		getImages: queryResolvers.getImages,
		getCollections: queryResolvers.getCollections,
		getCollectionsData: queryResolvers.getCollectionsData,
		getUserData: queryResolvers.getUserData
	},
	Mutation: {
		addWord: mutationResolvers.addWord,
		addToUserCollection: mutationResolvers.addToUserCollection,
		addNewCollection: collectionsAddNew.addNewCollection,
		deleteWord: deleteWord.deleteWord,
		updateCollectionWordInfo: updateCollectionWordInfo.updateCollectionWordInfo
	}
}
