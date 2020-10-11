const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools')
const { typeDefs, resolvers } = require('../grapghql');
const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const validation = require('./validation');

module.exports = (app) => {

  const resolversComposition = {
    'Mutation.createUser': [validation()],
    'Mutation.updateUser': [validation()],
  };

  const composedResolvers = composeResolvers(resolvers, resolversComposition);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: composedResolvers,
  })
 
  const server = new ApolloServer({ schema });
  
  server.applyMiddleware({ app, cors: true, path: '/graphql' })
}