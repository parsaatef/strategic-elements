import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    totalStats(id: ID!): TotalStats @auth
    totalStatsList: [TotalStats!]! @auth
    searchTotalStats(
      ids: [ID!]
      name: String
      year: Int
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): TotalStatsResult @auth
  }

  extend type Mutation {
    registerTotalStats(
      name: String!
      value: String!
      year: Int!
      unit: String
      element: String!
    ): TotalStats @auth
    updateTotalStats(
      id: ID!
      name: String!
      value: String!
      year: Int!
      unit: String
      element: String!
    ): Result @auth
    removeTotalStats(id: ID!): Result @auth
    multiRemoveTotalStats(ids: [ID!]!): Result @auth
  }

  type TotalStatsResult {
    totalStatsList: [TotalStats!]!
    totalCount: Int
  }

  type TotalStats {
    id: ID!
    name: String!
    value: String!
    year: Int!
    unit: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
