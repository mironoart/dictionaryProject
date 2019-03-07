import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typesArray = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const typeDefs = `${typesArray}`

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

export default schema
