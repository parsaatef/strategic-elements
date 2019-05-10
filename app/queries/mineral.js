import { gql } from 'apollo-boost';

export const GET_MINERAL = gql`
  query($id: ID!) {
    mineral(id: $id) {
      id
      title
      formula
      color
      abundance
      description
      username
      elements
    }
  }
`;

export const GET_MINERALS = gql`
  query(
    $ids: [ID!]
    $title: String
    $description: String
    $color: String
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchMineral(
      ids: $ids
      title: $title
      description: $description
      color: $color
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      minerals {
        id
        title
        formula
        color
        abundance
        description
        username
        elements
      }
      totalCount
    }
  }
`;

export const REGISTER_MINERAL = gql`
  mutation(
    $title: String!
    $formula: String!
    $color: String!
    $abundance: String!
    $description: String!
    $elements: [String!]
  ) {
    registerMineral(
      title: $title
      formula: $formula
      color: $color
      abundance: $abundance
      description: $description
      elements: $elements
    ) {
      id
    }
  }
`;

export const UPDATE_MINERAL = gql`
  mutation(
    $id: ID!
    $title: String!
    $formula: String!
    $color: String!
    $abundance: String!
    $description: String!
    $elements: [String!]
  ) {
    updateMineral(
      id: $id
      title: $title
      formula: $formula
      color: $color
      abundance: $abundance
      description: $description
      elements: $elements
    ) {
      result
    }
  }
`;

export const DELETE_MINERAL = gql`
  mutation($id: ID!) {
    removeMineral(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_MINERALS = gql`
  mutation($ids: [ID!]!) {
    multiRemoveMinerals(ids: $ids) {
      result
    }
  }
`;