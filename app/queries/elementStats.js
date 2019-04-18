import { gql } from 'apollo-boost';

export const GET_ELEMENT_STATS = gql`
  query($id: ID!) {
    elementStats(id: $id) {
      id
      location
      locationType
      resourceValue
      productionValue
      consumptionValue
      exportValue
      importValue
      secondaryProductionValue
      mineCount
      year
      unit
      description
      username
      element
    }
  }
`;

export const GET_ELEMENTS_STATS = gql`
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
        locationType
        resourceValue
        productionValue
        consumptionValue
        exportValue
        importValue
        secondaryProductionValue
        mineCount
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

export const REGISTER_ELEMENT_STATS = gql`
  mutation(
    $location: String!
    $locationType: String!
    $resourceValue: Int!
    $productionValue: Int!
    $consumptionValue: Int!
    $exportValue: Int!
    $importValue: Int!
    $secondaryProductionValue: Int!
    $mineCount: Int!
    $year: Int!
    $unit: String!
    $description: String!
    $element: String!
  ) {
    registerElementStats(
      location: $location
      locationType: $locationType
      resourceValue: $resourceValue
      productionValue: $productionValue
      consumptionValue: $consumptionValue
      exportValue: $exportValue
      importValue: $importValue
      secondaryProductionValue: $secondaryProductionValue
      mineCount: $mineCount
      year: $year
      unit: $unit
      description: $description
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_ELEMENT_STATS = gql`
  mutation(
    $id: ID!
    $location: String!
    $locationType: String!
    $resourceValue: Int!
    $productionValue: Int!
    $consumptionValue: Int!
    $exportValue: Int!
    $importValue: Int!
    $secondaryProductionValue: Int!
    $mineCount: Int!
    $year: Int!
    $unit: String!
    $description: String!
    $element: String!
  ) {
    updateElementStats(
      id: $id
      location: $location
      locationType: $locationType
      resourceValue: $resourceValue
      productionValue: $productionValue
      consumptionValue: $consumptionValue
      exportValue: $exportValue
      importValue: $importValue
      secondaryProductionValue: $secondaryProductionValue
      mineCount: $mineCount
      year: $year
      unit: $unit
      description: $description
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_ELEMENT_STATS = gql`
  mutation($id: ID!) {
    removeElementStats(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_ELEMENTS_STATS = gql`
  mutation($ids: [ID!]!) {
    multiRemoveElementStats(ids: $ids) {
      result
    }
  }
`;
