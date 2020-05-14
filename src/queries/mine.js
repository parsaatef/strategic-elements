import { gql } from 'apollo-boost';

export const GET_MINE = gql`
  query($id: ID!) {
    mine(id: $id) {
      id
      title
      location
      locationType
      mineral
      caratAverage
      status
      productionValue
      unit
      impactPreventLocalDeprivation
      description
      username
      element
    }
  }
`;

export const GET_MINES = gql`
  query(
    $ids: [ID!]
    $title: String
    $location: String
    $locationType: String
    $mineral: String
    $description: String
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchMine(
      ids: $ids
      title: $title
      location: $location
      locationType: $locationType
      description: $description
      mineral: $mineral
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      mines {
        id
        title
        location
        locationType
        mineral
        caratAverage
        status
        productionValue
        unit
        impactPreventLocalDeprivation
        description
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_MINE = gql`
  mutation(
    $title: String!
    $location: String!
    $locationType: String!
    $mineral: String
    $caratAverage: Float
    $status: String
    $productionValue: Float
    $unit: String
    $impactPreventLocalDeprivation: String
    $description: String
    $element: String!
  ) {
    registerMine(
      title: $title
      location: $location
      locationType: $locationType
      mineral: $mineral
      caratAverage: $caratAverage
      status: $status
      productionValue: $productionValue
      unit: $unit
      impactPreventLocalDeprivation: $impactPreventLocalDeprivation
      description: $description
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_MINE = gql`
  mutation(
    $id: ID!
    $title: String!
    $location: String!
    $locationType: String!
    $mineral: String
    $caratAverage: Float
    $status: String
    $productionValue: Float
    $unit: String
    $impactPreventLocalDeprivation: String
    $description: String
    $element: String!
  ) {
    updateMine(
      id: $id
      title: $title
      location: $location
      locationType: $locationType
      mineral: $mineral
      caratAverage: $caratAverage
      status: $status
      productionValue: $productionValue
      unit: $unit
      impactPreventLocalDeprivation: $impactPreventLocalDeprivation
      description: $description
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_MINE = gql`
  mutation($id: ID!) {
    removeMine(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_MINES = gql`
  mutation($ids: [ID!]!) {
    multiRemoveMines(ids: $ids) {
      result
    }
  }
`;
