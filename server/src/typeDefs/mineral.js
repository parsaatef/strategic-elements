import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    mineral(id: ID!): Mineral @guest
    minerals: [Mineral!]! @guest
    searchMineral(
      ids: [ID!]
      title: String
      description: String
      color: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
    ): [Mineral!]! @guest
  }

  extend type Mutation {
    registerMineral(
      title: String!
      formula: String!
      color: String!
      abundance: String!
      description: String!
      username: String!
      elements: [String!]
    ): Mineral @guest
    updateMineral(
      id: ID!
      title: String!
      formula: String!
      color: String!
      abundance: String!
      description: String!
      elements: [String!]
    ): Result @guest
    removeMineral(id: ID!): Result @guest
    multiRemoveMinerals(ids: [ID!]!): Result @guest
  }

  type Mineral {
    id: ID!
    title: String!
    formula: String!
    color: String!
    abundance: String!
    description: String!
    username: String!
    elements: [String!]
    createdAt: String!
    updatedAt: String!
  }
`;
