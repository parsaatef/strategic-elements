import { gql } from 'apollo-boost';

export const GET_MINE = gql`
  query($id: ID!) {
    mine(id: $id) {
      id
      title
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
    $description: String
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
  ) {
    searchMine(
      ids: $ids
      title: $title
      description: $description
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
    ) {
      mines {
        id
        title
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
    $activeMines: Int!
    $productionValue: Int!
    $unit: String!
    $description: String!
    $username: String!
    $element: String!
  ) {
    registerMine(
      title: $title
      activeMines: $activeMines
      productionValue: $productionValue
      unit: $unit
      description: $description
      username: $username
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
    $activeMines: Int!
    $productionValue: Int!
    $unit: String!
    $description: String!
    $username: String!
    $element: String!
  ) {
    updateMine(
      id: $id
      title: $title
      activeMines: $activeMines
      productionValue: $productionValue
      unit: $unit
      description: $description
      username: $username
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
