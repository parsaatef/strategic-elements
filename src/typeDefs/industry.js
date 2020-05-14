import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    industry(id: ID!): Industry @auth
    industries: [Industry!]! @auth
    searchIndustries(
      ids: [ID!]
      title: String
      type: String
      strategicImportance: String
      economicSignificance: String
      jobCreationRate: String
      description: String
      moreInfo: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): IndustriesResult @auth
  }

  extend type Mutation {
    registerIndustry(
      title: String!
      type: String!
      strategicImportance: String
      economicSignificance: String
      jobCreationRate: String
      description: String
      moreInfo: String
      element: String!
    ): Industry @auth
    updateIndustry(
      id: ID!
      title: String!
      type: String!
      strategicImportance: String
      economicSignificance: String
      jobCreationRate: String
      description: String
      moreInfo: String
      element: String!
    ): Result @auth
    removeIndustry(id: ID!): Result @auth
    multiRemoveIndustries(ids: [ID!]!): Result @auth
  }

  type IndustriesResult {
    industries: [Industry!]!
    totalCount: Int
  }

  type Industry {
    id: ID!
    title: String!
    type: String!
    strategicImportance: String
    economicSignificance: String
    jobCreationRate: String
    description: String
    moreInfo: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
