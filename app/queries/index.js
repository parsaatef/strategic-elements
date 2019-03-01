import { gql } from 'apollo-boost';

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      id
      email
      username
      name
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

export const SIGNUP_USER = gql`
  mutation(
    $email: String!
    $username: String!
    $name: String!
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      name: $name
      password: $password
    ) {
      id
    }
  }
`;
