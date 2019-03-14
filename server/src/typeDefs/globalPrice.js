import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    globalPrice(id: ID!): GlobalPrice @guest
    globalPrices: [GlobalPrice!]! @guest
    searchPrice(
      ids: [ID!]
      minPrice: Int
      maxPrice: Int
      year: Int
      elements: [String!]
      users: [String!]
      sort: String
      sortBy: String
    ): [GlobalPrice!]! @guest
  }

  extend type Mutation {
    registerPrice(
      price: Int!
      year: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): GlobalPrice @guest
    updatePrice(
      id: ID!
      price: Int!
      year: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): Result @guest
    removePrice(id: ID!): Result @guest
    multiRemovePrices(ids: [ID!]!): Result @guest
  }

  type GlobalPrice {
    id: ID!
    price: Int!
    year: Int!
    unit: String!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
