import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    elementStats(id: ID!): ElementStats @auth
    elementsStats: [ElementStats!]! @auth
    statsByElements(year: Int, elements: [String!]): [ElementMixStats] @auth
    searchElementStats(
      ids: [ID!]
      location: String
      locationType: String
      year: Int
      users: [String!]
      elements: [String!]
      type: String
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): ElementsStatsResult @auth
  }

  extend type Mutation {
    registerElementStats(
      location: String!
      locationType: String!
      productionValue: Float!
      consumptionValue: Float
      exportValue: Float
      importValue: Float
      secondaryProductionValue: Float
      year: Int!
      unit: String
      description: String
      element: String!
    ): ElementStats @auth
    updateElementStats(
      id: ID!
      location: String!
      locationType: String!
      productionValue: Float!
      consumptionValue: Float
      exportValue: Float
      importValue: Float
      secondaryProductionValue: Float
      year: Int!
      unit: String
      description: String
      element: String!
    ): Result @auth
    removeElementStats(id: ID!): Result @auth
    multiRemoveElementStats(ids: [ID!]!): Result @auth
  }

  type Result {
    result: Boolean!
  }

  type ElementsStatsResult {
    elementsStats: [ElementStats!]!
    totalCount: Int
  }

  type ElementMixStats {
    id: ID!
    location: String!
    locationType: String!
    productionValue: Float!
    consumptionValue: Float
    exportValue: Float
    importValue: Float
    secondaryProductionValue: Float
    year: Int!
    unit: String
    element: String!
    resourceStats: Resource
  }

  type ElementStats {
    id: ID!
    location: String!
    locationType: String!
    productionValue: Float!
    consumptionValue: Float
    exportValue: Float
    importValue: Float
    secondaryProductionValue: Float
    year: Int!
    unit: String
    description: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
