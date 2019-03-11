import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    elementStats(id: ID!): ElementStats @guest
    elementsStats: [ElementStats!]! @guest
    searchElementStats(
      ids: [ID!]
      location: String
      locationType: String
      year: Int
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
    ): [ElementStats!]! @guest
  }

  extend type Mutation {
    registerElementStats(
      location: String!
      locationType: String!
      resourceValue: Int!
      productionValue: Int!
      consumptionValue: Int!
      exportValue: Int!
      importValue: Int!
      secondaryProductionValue: Int!
      mineCount: Int!
      year: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): ElementStats @guest
    updateElementStats(
      id: ID!
      location: String!
      locationType: String!
      resourceValue: Int!
      productionValue: Int!
      consumptionValue: Int!
      exportValue: Int!
      importValue: Int!
      secondaryProductionValue: Int!
      mineCount: Int!
      year: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): Result @guest
    removeElementStats(id: ID!): Result @guest
    multiRemoveElementStats(ids: [ID!]!): Result @guest
  }

  type Result {
    result: Boolean!
  }

  type ElementStats {
    id: ID!
    location: String!
    locationType: String!
    resourceValue: Int!
    productionValue: Int!
    consumptionValue: Int!
    exportValue: Int!
    importValue: Int!
    secondaryProductionValue: Int!
    mineCount: Int!
    year: Int!
    unit: String!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
