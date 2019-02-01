import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../resolvers";

const typeDefs = `

type Obj {
  id: String
  translationId: String
  word: String
}
  type Query {
    getRuWords(word: String!): String
  }


  type Mutation {
    addWord(word: String!): String
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
