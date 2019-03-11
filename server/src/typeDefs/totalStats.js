import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {

  }

  extend type Mutation {

  }

  type Result {
    result: Boolean!
  }

  type TotalStats {
    id: ID!
    name: String!
    value: String!
    year: Int!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }

`;
