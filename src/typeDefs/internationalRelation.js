import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    internationalRelation(id: ID!): InternationalRelation @auth
    internationalRelations: [InternationalRelation!]! @auth
    searchInternationalRelations(
      ids: [ID!]
      country: String
      relationLevel: String
      moreInfo: String
      users: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): InternationalRelationsResult @auth
  }

  extend type Mutation {
    registerInternationalRelation(
      country: String!
      relationLevel: String!
      moreInfo: String
    ): InternationalRelation @auth
    updateInternationalRelation(
      id: ID!
      country: String!
      relationLevel: String!
      moreInfo: String
    ): Result @auth
    removeInternationalRelation(id: ID!): Result @auth
    multiRemoveInternationalRelations(ids: [ID!]!): Result @auth
  }

  type InternationalRelationsResult {
    internationalRelations: [InternationalRelation!]!
    totalCount: Int
  }

  type InternationalRelation {
    id: ID!
    country: String!
    relationLevel: String!
    moreInfo: String
    username: String!
    createdAt: String!
    updatedAt: String!
  }
`;
