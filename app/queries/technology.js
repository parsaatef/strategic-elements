import { gql } from 'apollo-boost';

export const GET_TECHNOLOGY = gql`
  query($id: ID!) {
    technology(id: $id) {
      id
      title
      level
      strategicImportance
      economicSignificance
      rateOfJobCreation
      AvailabilityInIran
      description
      username
      element
    }
  }
`;

export const GET_TECHNOLOGIES = gql`
  query(
    $ids: [ID!]
    $title: String
    $level: String
    $strategicImportance: String
    $economicSignificance: String
    $rateOfJobCreation: String
    $AvailabilityInIran: String
    $description: String
    $users: [String!]
    $element: String
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchTechnologies(
      ids: $ids
      $title: $title
      $level: $level
      $strategicImportance: $strategicImportance
      $economicSignificance: $economicSignificance
      $rateOfJobCreation: $rateOfJobCreation
      $AvailabilityInIran: $AvailabilityInIran
      $description: $description
      users: $users
      element: $element
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      technologies {
        id
        title
        level
        strategicImportance
        economicSignificance
        rateOfJobCreation
        AvailabilityInIran
        description
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_TECHNOLOGY = gql`
  mutation(
    $title: $title
    $level: $level
    $strategicImportance: $strategicImportance
    $economicSignificance: $economicSignificance
    $rateOfJobCreation: $rateOfJobCreation
    $AvailabilityInIran: $AvailabilityInIran
    $description: $description
    $element: String!
  ) {
    registerTechnology(
      $title: $title
      $level: $level
      $strategicImportance: $strategicImportance
      $economicSignificance: $economicSignificance
      $rateOfJobCreation: $rateOfJobCreation
      $AvailabilityInIran: $AvailabilityInIran
      $description: $description
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_TECHNOLOGY = gql`
  mutation(
    $id: ID!
    $title: $title
    $level: $level
    $strategicImportance: $strategicImportance
    $economicSignificance: $economicSignificance
    $rateOfJobCreation: $rateOfJobCreation
    $AvailabilityInIran: $AvailabilityInIran
    $description: $description
    $element: String!
  ) {
    updateTechnology(
      $title: $title
      $level: $level
      $strategicImportance: $strategicImportance
      $economicSignificance: $economicSignificance
      $rateOfJobCreation: $rateOfJobCreation
      $AvailabilityInIran: $AvailabilityInIran
      $description: $description
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_TECHNOLOGY = gql`
  mutation($id: ID!) {
    removeTechnology(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_TECHNOLOGIES = gql`
  mutation($ids: [ID!]!) {
    multiRemoveTechnologies(ids: $ids) {
      result
    }
  }
`;
