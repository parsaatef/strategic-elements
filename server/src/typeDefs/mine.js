import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    mine(id: ID!): Mine @auth
    mines: [Mine!]! @auth
    searchMine(
      ids: [ID!]
      title: String
      description: String
      location: String
      locationType: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): MinesResult @auth
  }

  extend type Mutation {
    registerMine(
      title: String!
      location: String!
      locationType: String!
      activeMines: Boolean!
      productionValue: Int!
      unit: String!
      description: String
      element: String!
    ): Mine @auth
    updateMine(
      id: ID!
      title: String!
      location: String!
      locationType: String!
      activeMines: Boolean!
      productionValue: Int!
      unit: String!
      description: String
      element: String!
    ): Result @auth
    removeMine(id: ID!): Result @auth
    multiRemoveMines(ids: [ID!]!): Result @auth
  }

  type MinesResult {
    mines: [Mine!]!
    totalCount: Int
  }

  type Mine {
    id: ID!
    title: String!
    location: String
    locationType: String
    activeMines: Boolean
    productionValue: Int!
    unit: String!
    description: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
