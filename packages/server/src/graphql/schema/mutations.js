export default `
input Test {
  word: String
  from: String
  to: String
}
type isCreated {
  created: Boolean
}
type Mutation {
  addWord(language: String! word:String! translatedWord: String! partOfSpeech: String! ) : String
  addToUserCollection(collectionName: String! word: String! translations: [String!] sentence: [Test!] image: String! time: String!) :String
  addNewCollection(collectionName: String!): String
  deleteWord(collectionName: String! word: String!): String
  updateCollectionWordInfo( collection: String! id: String! time: String! ): String
  signUp(username: String! email: String! password: String!): [isCreated]
}
`
