import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getCurrentUser: User @auth
    user(id: ID!): User @auth
    users: [User!]! @auth
  }

  type Token {
    token: String!
  }

  extend type Mutation {
    signUp(
      email: String!
      username: String!
      name: String!
      password: String!
    ): User @auth
    signIn(email: String!, password: String!): Token
    signOut: Boolean @auth
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    createdAt: String!
  }
`;
