import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    totalStats(id: ID!): TotalStats @guest
    totalStatsList: [TotalStats!]! @guest
    searchTotalStats(
      ids: [ID!]
      name: String
      year: Int
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
    ): [TotalStats!]! @guest
  }

  extend type Mutation {
    registerTotalStats(
      name: String!
      value: String!
      year: Int!
      username: String!
      element: String!
    ): TotalStats @guest
    updateTotalStats(
      id: ID!
      name: String!
      value: String!
      year: Int!
      username: String!
      element: String!
    ): Result @guest
    removeTotalStats(id: ID!): Result @guest
    multiRemoveTotalStats(ids: [ID!]!): Result @guest
  }

  type TotalStats {
    id: ID!
    name: String!
    value: String!
    year: Int!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
