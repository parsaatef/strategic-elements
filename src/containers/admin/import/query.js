import { gql } from 'apollo-boost';

export const GET_IMPORT = gql`
  query($id: ID!) {
    elementStats(id: $id) {
      id
      location
      importValue
      year
      unit
      description
      username
      element
    }
  }
`;

export const GET_IMPORTS = gql`
  query(
    $ids: [ID!]
    $location: String
    $locationType: String
    $year: Int
    $users: [String!]
    $elements: [String!]
    $type: String
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
      type: $type
      sort: $sort
      sortBy: $sortBy
      first: $first
      offset: $offset
    ) {
      elementsStats {
        id
        location
        importValue
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
