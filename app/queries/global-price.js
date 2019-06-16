import { gql } from 'apollo-boost';

export const GET_GLOBAL_PRICE = gql`
  query($id: ID!) {
    globalPrice(id: $id) {
      id
      price
      year
      unit
      description
      username
      element
    }
  }
`;

export const GET_GLOBAL_PRICES = gql`
  query(
    $ids: [ID!]
    $minPrice: Int
    $maxPrice: Int
    $year: Int
    $elements: [String!]
    $users: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchPrice(
      ids: $ids
      minPrice: $minPrice
      maxPrice: $maxPrice
      year: $year
      elements: $elements
      users: $users
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      globalPrices {
        id
        price
        year
        unit
        description
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_PRICE = gql`
  mutation(
    $price: Float!
    $year: Int!
    $unit: String!
    $description: String
    $element: String!
  ) {
    registerPrice(
      price: $price
      year: $year
      unit: $unit
      description: $description
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_PRICE = gql`
  mutation(
    $id: ID!
    $price: Float!
    $year: Int!
    $unit: String!
    $description: String
    $element: String!
  ) {
    updatePrice(
      id: $id
      price: $price
      year: $year
      unit: $unit
      description: $description
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_PRICE = gql`
  mutation($id: ID!) {
    removePrice(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_PRICES = gql`
  mutation($ids: [ID!]!) {
    multiRemovePrices(ids: $ids) {
      result
    }
  }
`;
