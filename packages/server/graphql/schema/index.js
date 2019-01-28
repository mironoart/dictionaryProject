import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../resolvers";

const typeDefs = `
  type Query {
    name: String
  }

  type Mutation {
    name: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
