import { gql } from 'apollo-boost';

export const GET_OPTION = gql`
  query($id: ID!) {
    option(id: $id) {
      id
      name
      value
      type
      element
      username
    }
  }
`;

export const GET_OPTIONS = gql`
  query(
    $ids: [ID!]
    $name: String
    $value: String
    $type: String
    $element: String
    $users: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchOptions(
      ids: $ids
      name: $name
      value: $value
      type: $type
      element: $element
      users: $users
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      options {
        id
        name
        value
        type
        element
        username
      }
      totalCount
    }
  }
`;

export const REGISTER_OPTION = gql`
  mutation($name: String!, $value: String!, $type: String!, $element: String!) {
    registerOption(name: $name, value: $value, type: $type, element: $element) {
      id
    }
  }
`;

export const UPDATE_OPTION = gql`
  mutation(
    $id: ID!
    $name: String!
    $value: String!
    $type: String!
    $element: String!
  ) {
    updateOption(
      id: $id
      name: $name
      value: $value
      type: $type
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_OPTION = gql`
  mutation($id: ID!) {
    removeOption(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_OPTIONS = gql`
  mutation($ids: [ID!]!) {
    multiRemoveOptions(ids: $ids) {
      result
    }
  }
`;
