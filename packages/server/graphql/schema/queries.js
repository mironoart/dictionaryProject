export default `
type WordInfo {
  microsoftFrequency: String
  partOfSpeech: String
  translatedWord: String
  userFrequency: String
  confidence: String
}

type Words {
  id: String
  word: String
  translationsId: String
  partOfSpeech: String
  microsoftFrequency: String
}

type Examples {
  fromSentence: String
  toSentence: String
}

type Images {
  index: String
  img: String
}

type Collections {
  name: String
}

type CollectionData {
  id: ID
  word: String
  translations: String
  sentences: String
  image: String
  time: String
}
type UserData {
  lengDirection: String
  quantityOfWords: String
  email: String
  image: String
  username: String
}

type Query {
  getWords(language: String! word: String!): [WordInfo]
  getMicrosoft(from: String! to: String! word: String!): [WordInfo]
  getExamples(from: String! to: String! word: String! translation: String!): [Examples]
  getImages(word: String!): [Images]
  getCollections: [Collections]
  getCollectionsData(collectionName: String!): [CollectionData]
  getUserData: [UserData]
}
`
