import { gql } from 'apollo-boost';

export const GET_MINERAL = gql`
  query($id: ID!) {
    mineral(id: $id) {
      id
      title
      alias
      formula
      color
      abundance
      description
      moreInfo
      username
      elements
    }
  }
`;

export const GET_MINERALS = gql`
  query(
    $ids: [ID!]
    $title: String
    $alias: String
    $description: String
    $abundance: String
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
      alias: $alias
      description: $description
      abundance: $abundance
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
        alias
        formula
        color
        abundance
        description
        moreInfo
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
    $alias: String!
    $formula: String
    $color: String
    $abundance: String!
    $description: String
    $moreInfo: String
    $elements: [String!]!
  ) {
    registerMineral(
      title: $title
      alias: $alias
      formula: $formula
      color: $color
      abundance: $abundance
      description: $description
      moreInfo: $moreInfo
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
    $alias: String!
    $formula: String
    $color: String
    $abundance: String!
    $description: String
    $moreInfo: String
    $elements: [String!]!
  ) {
    updateMineral(
      id: $id
      title: $title
      alias: $alias
      formula: $formula
      color: $color
      abundance: $abundance
      description: $description
      moreInfo: $moreInfo
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
