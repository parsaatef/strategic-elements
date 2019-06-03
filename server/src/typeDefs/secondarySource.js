import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    secondarySource(id: ID!): SecondarySource @auth
    secondarySources: [SecondarySource!]! @auth
    searchSecondarySource(
      ids: [ID!]
      title: String
      description: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): SecondarySourcesResult @auth
  }

  extend type Mutation {
    registerSecondarySource(
      title: String!
      value: String!
      unit: String!
      description: String
      element: String!
    ): SecondarySource @auth
    updateSecondarySource(
      id: ID!
      title: String!
      value: String!
      unit: String!
      description: String
      element: String!
    ): Result @auth
    removeSecondarySource(id: ID!): Result @auth
    multiRemoveSecondarySources(ids: [ID!]!): Result @auth
  }

  type SecondarySourcesResult {
    secondarySources: [SecondarySource!]!
    totalCount: Int
  }

  type SecondarySource {
    id: ID!
    title: String!
    value: String!
    unit: String!
    description: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
