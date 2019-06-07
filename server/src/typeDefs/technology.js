import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    mine(id: ID!): Technology @auth
    mines: [Technology!]! @auth
    searchTechnologies(
      ids: [ID!]
      title: String
      level: String
      strategicImportance: String
      economicSignificance: String
      rateOfJobCreation: String
      AvailabilityInIran: String
      description: String
      users: [String!]
      element: String
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): TechnologiesResult @auth
  }

  extend type Mutation {
    registerTechnology(
      title: String!
      level: String!
      strategicImportance: String
      economicSignificance: String
      rateOfJobCreation: String
      AvailabilityInIran: String
      description: String
      element: String!
    ): Technology @auth
    updateTechnology(
      id: ID!
      title: String!
      level: String!
      strategicImportance: String
      economicSignificance: String
      rateOfJobCreation: String
      AvailabilityInIran: String
      description: String
      element: String!
    ): Result @auth
    removeTechnology(id: ID!): Result @auth
    multiRemoveTechnologies(ids: [ID!]!): Result @auth
  }

  type TechnologiesResult {
    mines: [Technology!]!
    totalCount: Int
  }

  type Technology {
    id: ID!
    title: String!
    level: String!
    strategicImportance: String
    economicSignificance: String
    rateOfJobCreation: String
    AvailabilityInIran: String
    description: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
