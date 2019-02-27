export default `
type Mutation {
  addWord(language: String! word:String! translatedWord: String! partOfSpeech: String! ) : String
  addToUserCollection(collectionName: String! word: String! translations: String! sentence: String! image: String! time: String!) :String
  addNewCollection(collectionName: String!): String
  deleteWord(collectionName: String! word: String!): String
}
`
