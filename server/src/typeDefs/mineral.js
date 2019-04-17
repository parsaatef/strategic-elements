import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    mineral(id: ID!): Mineral @auth
    minerals: [Mineral!]! @auth
    searchMineral(
      ids: [ID!]
      title: String
      description: String
      color: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): [MineralsResult!]! @auth
  }

  extend type Mutation {
    registerMineral(
      title: String!
      formula: String!
      color: String!
      abundance: Float!
      description: String!
      elements: [String!]
    ): Mineral @auth
    updateMineral(
      id: ID!
      title: String!
      formula: String!
      color: String!
      abundance: Float!
      description: String!
      elements: [String!]
    ): Result @auth
    removeMineral(id: ID!): Result @auth
    multiRemoveMinerals(ids: [ID!]!): Result @auth
  }

  type MineralsResult {
    minerals: [Mineral!]!
    totalCount: Int
  }

  type Mineral {
    id: ID!
    title: String!
    formula: String!
    color: String!
    abundance: Float!
    description: String!
    username: String!
    elements: [String!]
    createdAt: String!
    updatedAt: String!
  }
`;
