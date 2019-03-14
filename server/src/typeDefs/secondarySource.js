import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    secondarySource(id: ID!): SecondarySource @guest
    secondarySources: [SecondarySource!]! @guest
    searchSecondarySource(
      ids: [ID!]
      title: String
      description: String
      users: [String!]
      elements: [String!]
      sort: String
      sortBy: String
    ): [SecondarySource!]! @guest
  }

  extend type Mutation {
    registerSecondarySource(
      title: String!
      value: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): SecondarySource @guest
    updateSecondarySource(
      id: ID!
      title: String!
      value: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): Result @guest
    removeSecondarySource(id: ID!): Result @guest
    multiRemoveSecondarySources(ids: [ID!]!): Result @guest
  }

  type SecondarySource {
    id: ID!
    title: String!
    value: Int!
    unit: String!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
