import { gql } from 'apollo-boost';

export const GET_TOTAL_STATS = gql`
  query($id: ID!) {
    totalStats(id: $id) {
      id
      name
      value
      year
      unit
      username
      element
    }
  }
`;

export const GET_TOTAL_STATS_LIST = gql`
  query(
    $ids: [ID!]
    $name: String
    $year: Int
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchTotalStats(
      ids: $ids
      name: $name
      year: $year
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      totalStatsList {
        id
        name
        value
        year
        unit
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_TOTAL_STATS = gql`
  mutation(
    $name: String!
    $value: String!
    $year: Int!
    $unit: String
    $element: String!
  ) {
    registerTotalStats(
      name: $name
      value: $value
      year: $year
      unit: $unit
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_TOTAL_STATS = gql`
  mutation(
    $id: ID!
    $name: String!
    $value: String!
    $year: Int!
    $unit: String
    $element: String!
  ) {
    updateTotalStats(
      id: $id
      name: $name
      value: $value
      year: $year
      unit: $unit
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_TOTAL_STATS = gql`
  mutation($id: ID!) {
    removeTotalStats(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_TOTAL_STATS = gql`
  mutation($ids: [ID!]!) {
    multiRemoveTotalStats(ids: $ids) {
      result
    }
  }
`;
