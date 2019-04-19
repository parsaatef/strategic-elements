import { gql } from 'apollo-boost';

export const GET_SECONDARY_SOURCE = gql`
  query($id: ID!) {
    secondarySource(id: $id) {
      id
      title
      value
      unit
      description
      username
      element
    }
  }
`;

export const GET_SECONDARY_SOURCES = gql`
  query(
    $ids: [ID!]
    $title: String
    $description: String
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
  ) {
    searchSecondarySource(
      ids: $ids
      title: $title
      description: $description
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
    ) {
      secondarySources {
        id
        title
        value
        unit
        description
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_SOURCE = gql`
  mutation(
    $title: String!
    $value: Int!
    $unit: String!
    $description: String!
    $username: String!
    $element: String!
  ) {
    registerSecondarySource(
      title: $title
      value: $value
      unit: $unit
      description: $description
      username: $username
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_SOURCE = gql`
  mutation(
    $id: ID!
    $title: String!
    $value: Int!
    $unit: String!
    $description: String!
    $username: String!
    $element: String!
  ) {
    updateSecondarySource(
      id: $id
      title: $title
      value: $value
      unit: $unit
      description: $description
      username: $username
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_SOURCE = gql`
  mutation($id: ID!) {
    removeSecondarySource(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_SOURCES = gql`
  mutation($ids: [ID!]!) {
    multiRemoveSecondarySources(ids: $ids) {
      result
    }
  }
`;
