import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    threat(id: ID!): Threat @auth
    threats: [Threat!]! @auth
    searchThreats(
      ids: [ID!]
      effectivenessSanctions: String
      impactTariffs: String
      levelGovernmentalSupport: String
      diffRawMaterialValueAProcessedProduct: String
      moreInfo: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): ThreatsResult @auth
  }

  extend type Mutation {
    registerThreat(
      effectivenessSanctions: String
      impactTariffs: String
      levelGovernmentalSupport: String
      diffRawMaterialValueAProcessedProduct: String!
      moreInfo: String
      element: String!
    ): Threat @auth
    updateThreat(
      id: ID!
      effectivenessSanctions: String
      impactTariffs: String
      levelGovernmentalSupport: String
      diffRawMaterialValueAProcessedProduct: String!
      moreInfo: String
      element: String!
    ): Result @auth
    removeThreat(id: ID!): Result @auth
    multiRemoveThreats(ids: [ID!]!): Result @auth
  }

  type ThreatsResult {
    threats: [Threat!]!
    totalCount: Int
  }

  type Threat {
    id: ID!
    effectivenessSanctions: String
    impactTariffs: String
    levelGovernmentalSupport: String
    diffRawMaterialValueAProcessedProduct: String!
    moreInfo: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
