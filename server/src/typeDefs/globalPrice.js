import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    globalPrice(id: ID!): GlobalPrice @auth
    globalPrices: [GlobalPrice!]! @auth
    searchPrice(
      ids: [ID!]
      minPrice: Int
      maxPrice: Int
      year: Int
      elements: [String!]
      users: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): PricesResult @auth
  }

  extend type Mutation {
    registerPrice(
      price: Int!
      year: Int!
      unit: String!
      description: String
      element: String!
    ): GlobalPrice @auth
    updatePrice(
      id: ID!
      price: Int!
      year: Int!
      unit: String!
      description: String
      element: String!
    ): Result @auth
    removePrice(id: ID!): Result @auth
    multiRemovePrices(ids: [ID!]!): Result @auth
  }

  type PricesResult {
    globalPrices: [GlobalPrice!]!
    totalCount: Int
  }

  type GlobalPrice {
    id: ID!
    price: Int!
    year: Int!
    unit: String!
    description: String
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
