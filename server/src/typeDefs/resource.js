import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    resource(id: ID!): Resource @auth
    resources: [Resource!]! @auth
    searchResource(
      ids: [ID!]
      description: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): ResourcesResult @auth
  }

  extend type Mutation {
    registerResource(
      location: String!
      primarySource: Float
      unit: String
      secondarySource: String
      description: String
      moreInfo: String
      element: String!
    ): Resource @auth
    updateResource(
      id: ID!
      location: String!
      primarySource: Float
      unit: String
      secondarySource: String
      description: String
      moreInfo: String
      element: String!
    ): Result @auth
    removeResource(id: ID!): Result @auth
    multiRemoveResources(ids: [ID!]!): Result @auth
  }

  type ResourcesResult {
    resources: [Resource!]!
    totalCount: Int
  }

  type Resource {
    id: ID!
    location: String!
    primarySource: Float
    unit: String
    secondarySource: String
    description: String
    moreInfo: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
