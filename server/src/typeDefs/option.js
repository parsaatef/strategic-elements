import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    option(id: ID!): Option @guest
    getOption(name: String): Option @guest
    searchOptions(
      ids: [ID!]
      name: String
      value: String
      type: String
      users: [String!]
      sort: String
      sortBy: String
    ): [Option!]! @guest
  }

  extend type Mutation {
    registerOption(
      name: String!
      value: String!
      type: String!
      username: String!
    ): Option @guest
    updateOption(id: ID!, name: String!, value: String!, type: String!): Result
      @guest
    removeOption(id: ID!): Result @guest
    multiRemoveOptions(ids: [ID!]!): Result @guest
  }

  type Option {
    id: ID!
    name: String!
    value: String!
    type: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }
`;
