import { gql } from 'apollo-boost';

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      id
      email
      username
      name
      role
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      email
      username
      name
      role
    }
  }
`;

export const GET_USERS = gql`
  query(
    $ids: [ID!]
    $name: String
    $username: String
    $role: String
    $email: String
    $sort: String
    $sortBy: String
    $first: Int
    $offset: Int
  ) {
    searchUser(
      ids: $ids
      name: $name
      username: $username
      role: $role
      email: $email
      sort: $sort
      sortBy: $sortBy
      first: $first
      offset: $offset
    ) {
      users {
        id
        email
        username
        name
        role
      }
      totalCount
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation(
    $email: String!
    $username: String!
    $name: String!
    $password: String!
    $role: String!
  ) {
    signUp(
      email: $email
      username: $username
      name: $name
      password: $password
      role: $role
    ) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation(
    $id: ID!
    $email: String!
    $name: String!
    $password: String
    $role: String!
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      password: $password
      role: $role
    ) {
      result
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    removeUser(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_USER = gql`
  mutation($ids: [ID!]!) {
    multiRemoveUsers(ids: $ids) {
      result
    }
  }
`;
