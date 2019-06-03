import { gql } from 'apollo-boost';

export const GET_MINE = gql`
  query($id: ID!) {
    mine(id: $id) {
      id
      title
      location
      locationType
      activeMines
      productionValue
      unit
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
        activeMines
        productionValue
        unit
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
    $activeMines: Boolean!
    $productionValue: Int!
    $unit: String!
    $description: String
    $element: String!
  ) {
    registerMine(
      title: $title
      location: $location
      locationType: $locationType
      activeMines: $activeMines
      productionValue: $productionValue
      unit: $unit
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
    $location: String!
    $locationType: String!
    $title: String!
    $activeMines: Boolean!
    $productionValue: Int!
    $unit: String!
    $description: String
    $element: String!
  ) {
    updateMine(
      id: $id
      title: $title
      location: $location
      locationType: $locationType
      activeMines: $activeMines
      productionValue: $productionValue
      unit: $unit
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
