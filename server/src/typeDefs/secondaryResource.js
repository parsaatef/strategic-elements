import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {

  }

  extend type Mutation {

  }

  type Result {
    result: Boolean!
  }

  type SecondaryResource {
    id: ID!
    title: String!
    value: Int!
    unit: String!
    description: String!
    username: String!
    type: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
