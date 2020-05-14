import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    option(id: ID!): Option @auth
    getOption(name: String): Option @auth
    searchOptions(
      ids: [ID!]
      name: String
      value: String
      type: String
      element: String
      users: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): OptionsResult @auth
  }

  extend type Mutation {
    registerOption(
      name: String!
      value: String!
      type: String!
      element: String!
    ): Option @auth
    updateOption(
      id: ID!
      name: String!
      value: String!
      type: String!
      element: String!
    ): Result @auth
    removeOption(id: ID!): Result @auth
    multiRemoveOptions(ids: [ID!]!): Result @auth
  }

  type OptionsResult {
    options: [Option!]!
    totalCount: Int
  }

  type Option {
    id: ID!
    name: String!
    value: String!
    type: String!
    element: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }
`;
