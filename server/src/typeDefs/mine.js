import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {

  }

  extend type Mutation {

  }

  type Result {
    result: Boolean!
  }

  type Mine {
    id: ID!
    title: String!
    activeMines: Int!
    productionValue: Int!
    unit: String!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
  
`;
