import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {

  }

  extend type Mutation {

  }

  type Result {
    result: Boolean!
  }

  type Mineral {
    id: ID!
    title: String!
    formula: String!
    color: String!
    abundance: Float!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
