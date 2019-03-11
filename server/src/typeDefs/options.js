import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {

  }

  extend type Mutation {

  }

  type Result {
    result: Boolean!
  }

  type Options {
    id: ID!
    name: String!
    value: String!
    type: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

`;
