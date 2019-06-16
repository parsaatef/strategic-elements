import { gql } from 'apollo-boost';

export const GET_RESOURCE = gql`
  query($id: ID!) {
    resource(id: $id) {
      id
      location
      primarySource
      unit
      secondarySource
      description
      moreInfo
      username
      element
    }
  }
`;

export const GET_RESOURCES = gql`
  query(
    $ids: [ID!]
    $description: String
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchResource(
      ids: $ids
      description: $description
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      resources {
        id
        location
        primarySource
        unit
        secondarySource
        description
        moreInfo
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_SOURCE = gql`
  mutation(
    $location: String!
    $primarySource: Float
    $unit: String
    $secondarySource: String
    $description: String
    $moreInfo: String
    $element: String!
  ) {
    registerResource(
      location: $location
      primarySource: $primarySource
      unit: $unit
      secondarySource: $secondarySource
      description: $description
      moreInfo: $moreInfo
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_SOURCE = gql`
  mutation(
    $id: ID!
    $location: String!
    $primarySource: Float
    $unit: String
    $secondarySource: String
    $description: String
    $moreInfo: String
    $element: String!
  ) {
    updateResource(
      id: $id
      location: $location
      primarySource: $primarySource
      unit: $unit
      secondarySource: $secondarySource
      description: $description
      moreInfo: $moreInfo
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_SOURCE = gql`
  mutation($id: ID!) {
    removeResource(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_SOURCES = gql`
  mutation($ids: [ID!]!) {
    multiRemoveResources(ids: $ids) {
      result
    }
  }
`;
