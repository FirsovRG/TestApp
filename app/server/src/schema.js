import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
  } from 'graphql-tools';
import { resolvers } from './resolvers';

  const typeDefs = `
  type User {           
      firstName: String!
      lastName: String!
      email: String!
      username: String!
      password: String!
  }
  
  type Query {
      users: [User]  
      user(username: String!): User
  }

  type Mutation {
      addUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): User!
      login(username: String!, password: String!):User
      editUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): User!
 }
  `;
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  export { schema };

