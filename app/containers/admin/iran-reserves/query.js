import { gql } from 'apollo-boost';

export const GET_RESOURCE = gql`
  query($id: ID!) {
    elementStats(id: $id) {
      id
      location
      resourceValue
      year
      unit
      description
      username
      element
    }
  }
`;

export const GET_RESOURCES = gql`
  query(
    $ids: [ID!]
    $location: String
    $locationType: String
    $year: Int
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
    $first: Int
    $offset: Int
  ) {
    searchElementStats(
      ids: $ids
      location: $location
      locationType: $locationType
      year: $year
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
      first: $first
      offset: $offset
    ) {
      elementsStats {
        id
        location
        resourceValue
        year
        unit
        description
        username
        element
      }
      totalCount
    }
  }
`;
