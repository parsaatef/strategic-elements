import { gql } from 'apollo-boost';

export const GET_ELEMENT_STATS = gql`
  query($id: ID!) {
    elementStats(id: $id) {
      id
      element
      location
      locationType
      year
      productionValue
      secondaryProductionValue
      consumptionValue
      exportValue
      importValue
      unit
      description
      username
    }
  }
`;

export const GET_ELEMENT_MIX_STATS = gql`
  query($year: Int, $elements: [String!]) {
    statsByElements(year: $year, elements: $elements) {
      id
      location
      locationType
      productionValue
      consumptionValue
      exportValue
      importValue
      secondaryProductionValue
      year
      unit
      element
      resourceStats {
        primarySource
        unit
        secondarySource
      }
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
        element
        location
        locationType
        year
        productionValue
        secondaryProductionValue
        consumptionValue
        exportValue
        importValue
        unit
        description
        username
      }
      totalCount
    }
  }
`;

export const REGISTER_ELEMENT_STATS = gql`
  mutation(
    $location: String!
    $locationType: String!
    $productionValue: Float!
    $consumptionValue: Float
    $exportValue: Float
    $importValue: Float
    $secondaryProductionValue: Float
    $year: Int!
    $unit: String
    $description: String
    $element: String!
  ) {
    registerElementStats(
      location: $location
      locationType: $locationType
      productionValue: $productionValue
      consumptionValue: $consumptionValue
      exportValue: $exportValue
      importValue: $importValue
      secondaryProductionValue: $secondaryProductionValue
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
    $productionValue: Float!
    $consumptionValue: Float
    $exportValue: Float
    $importValue: Float
    $secondaryProductionValue: Float
    $year: Int!
    $unit: String
    $description: String
    $element: String!
  ) {
    updateElementStats(
      id: $id
      location: $location
      locationType: $locationType
      productionValue: $productionValue
      consumptionValue: $consumptionValue
      exportValue: $exportValue
      importValue: $importValue
      secondaryProductionValue: $secondaryProductionValue
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
