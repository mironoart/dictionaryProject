import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers'

const typeDefs = `

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

type Query {

  getWords(
    language: String! 
    word: String!): [WordInfo]

  getMicrosoft(
    from: String! 
    to: String! 
    word: String!): [WordInfo]

  getExamples(from: String! to: String! word: String! translation: String!): [Examples]
}


type Mutation {
  addWord(
    language: String! 
    word:String! 
    translatedWord: String! 
    partOfSpeech: String!) : String
}
`

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

export default schema
