import { gql } from 'apollo-boost';

export const GET_INTERNATIONAL_RELATION = gql`
  query($id: ID!) {
    internationalRelation(id: $id) {
      id
      country
      relationLevel
      moreInfo
      username
    }
  }
`;

export const GET_INTERNATIONAL_RELATIONS = gql`
  query(
    $ids: [ID!]
    $country: String
    $relationLevel: String
    $moreInfo: String
    $users: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchInternationalRelations(
      ids: $ids
      country: $country
      relationLevel: $relationLevel
      moreInfo: $moreInfo
      users: $users
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      internationalRelations {
        id
        country
        relationLevel
        moreInfo
        username
      }
      totalCount
    }
  }
`;

export const REGISTER_INTERNATIONAL_RELATION = gql`
  mutation($country: String!, $relationLevel: String!, $moreInfo: String) {
    registerInternationalRelation(
      country: $country
      relationLevel: $relationLevel
      moreInfo: $moreInfo
    ) {
      id
    }
  }
`;

export const UPDATE_INTERNATIONAL_RELATION = gql`
  mutation(
    $id: ID!
    $country: String!
    $relationLevel: String!
    $moreInfo: String
  ) {
    updateInternationalRelation(
      id: $id
      country: $country
      relationLevel: $relationLevel
      moreInfo: $moreInfo
    ) {
      result
    }
  }
`;

export const DELETE_INTERNATIONAL_RELATION = gql`
  mutation($id: ID!) {
    removeInternationalRelation(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_INTERNATIONAL_RELATIONS = gql`
  mutation($ids: [ID!]!) {
    multiRemoveInternationalRelations(ids: $ids) {
      result
    }
  }
`;
