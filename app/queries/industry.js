import { gql } from 'apollo-boost';

export const GET_INDUSTRY = gql`
  query($id: ID!) {
    industry(id: $id) {
      id
      title
      type
      strategicImportance
      economicSignificance
      jobCreationRate
      description
      moreInfo
      username
      element
    }
  }
`;

export const GET_INDUSTRIES = gql`
  query(
    $ids: [ID!]
    $title: String
    $type: String
    $strategicImportance: String
    $economicSignificance: String
    $jobCreationRate: String
    $description: String
    $moreInfo: String
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchIndustries(
      ids: $ids
      title: $title
      type: $type
      strategicImportance: $strategicImportance
      economicSignificance: $economicSignificance
      jobCreationRate: $jobCreationRate
      description: $description
      moreInfo: $moreInfo
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      industries {
        id
        title
        type
        strategicImportance
        economicSignificance
        jobCreationRate
        description
        moreInfo
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_INDUSTRY = gql`
  mutation(
    $title: String!
    $type: String!
    $strategicImportance: String
    $economicSignificance: String
    $jobCreationRate: String
    $description: String
    $moreInfo: String
    $element: String!
  ) {
    registerIndustry(
      title: $title
      type: $type
      strategicImportance: $strategicImportance
      economicSignificance: $economicSignificance
      jobCreationRate: $jobCreationRate
      description: $description
      moreInfo: $moreInfo
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_INDUSTRY = gql`
  mutation(
    $id: ID!
    $title: String!
    $type: String!
    $strategicImportance: String
    $economicSignificance: String
    $jobCreationRate: String
    $description: String
    $moreInfo: String
    $element: String!
  ) {
    updateIndustry(
      id: $id
      title: $title
      type: $type
      strategicImportance: $strategicImportance
      economicSignificance: $economicSignificance
      jobCreationRate: $jobCreationRate
      description: $description
      moreInfo: $moreInfo
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_INDUSTRY = gql`
  mutation($id: ID!) {
    removeIndustry(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_INDUSTRIES = gql`
  mutation($ids: [ID!]!) {
    multiRemoveIndustries(ids: $ids) {
      result
    }
  }
`;
