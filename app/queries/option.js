import { gql } from 'apollo-boost';

export const GET_OPTION = gql`
  query($id: ID!) {
    option(id: $id) {
      id
      name
      value
      type
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
    $users: [String!]
    $sort: String
    $sortBy: String
  ) {
    searchOptions(
      ids: $ids
      name: $name
      value: $value
      type: $type
      users: $users
      sort: $sort
      sortBy: $sortBy
    ) {
      getOption {
        id
        name
        value
        type
        username
      }
      totalCount
    }
  }
`;

export const REGISTER_OPTION = gql`
  mutation(
    $name: String!
    $value: String!
    $type: String!
    $username: String!
  ) {
    registerOption(
      name: $name
      value: $value
      type: $type
      username: $username
    ) {
      id
    }
  }
`;

export const UPDATE_OPTION = gql`
  mutation($id: ID!, $name: String!, $value: String!, $type: String!) {
    updateOption(id: $id, name: $name, value: $value, type: $type) {
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
