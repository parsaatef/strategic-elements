import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    environment(id: ID!): Environment @auth
    environments: [Environment!]! @auth
    searchEnvironments(
      ids: [ID!]
      waterConsumption: String
      energyConsumption: String
      greenhouseGasEmissions: String
      risksWasteAWasteWater: String
      productionProcessRisksHuman: String
      moreInfo: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): EnvironmentsResult @auth
  }

  extend type Mutation {
    registerEnvironment(
      waterConsumption: String!
      energyConsumption: String
      greenhouseGasEmissions: String
      risksWasteAWasteWater: String!
      productionProcessRisksHuman: String
      moreInfo: String
      element: String!
    ): Environment @auth
    updateEnvironment(
      id: ID!
      waterConsumption: String!
      energyConsumption: String
      greenhouseGasEmissions: String
      risksWasteAWasteWater: String!
      productionProcessRisksHuman: String
      moreInfo: String
      element: String!
    ): Result @auth
    removeEnvironment(id: ID!): Result @auth
    multiRemoveEnvironments(ids: [ID!]!): Result @auth
  }

  type EnvironmentsResult {
    environments: [Environment!]!
    totalCount: Int
  }

  type Environment {
    id: ID!
    waterConsumption: String!
    energyConsumption: String
    greenhouseGasEmissions: String
    risksWasteAWasteWater: String!
    productionProcessRisksHuman: String
    moreInfo: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
