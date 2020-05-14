import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getCurrentUser: User @auth
    user(id: ID!): User @auth
    users: [User!]! @auth
    searchUser(
      ids: [ID!]
      name: String
      username: String
      role: String
      email: String
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): UsersResult @auth
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
      role: String!
    ): User @auth
    updateUser(
      id: ID!
      email: String!
      name: String!
      password: String
      role: String!
    ): Result @auth
    signIn(email: String!, password: String!): Token
    signOut: Boolean @auth
    removeUser(id: ID!): Result @auth
    multiRemoveUsers(ids: [ID!]!): Result @auth
  }

  type UsersResult {
    users: [User!]!
    totalCount: Int
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    role: String
    password: String
    createdAt: String!
  }
`;
