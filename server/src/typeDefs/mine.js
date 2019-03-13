import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    mine(id: ID!): Mine @guest
    mines: [Mine!]! @guest
    searchMine(
      ids: [ID!]
      title: String
      description: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
    ): [Mine!]! @guest
  }

  extend type Mutation {
    registerMine(
      title: String!
      activeMines: Int!
      productionValue: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): Mine @guest
    updateMine(
      id: ID!
      title: String!
      activeMines: Int!
      productionValue: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): Result @guest
    removeMine(id: ID!): Result @guest
    multiRemoveMines(ids: [ID!]!): Result @guest
  }

  type Mine {
    id: ID!
    title: String!
    activeMines: Int!
    productionValue: Int!
    unit: String!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
