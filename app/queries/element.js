import { gql } from 'apollo-boost';

export const GET_ELEMENT_BY_NAME = gql`
  query($element: String!) {
    elementByName(element: $element) {
      id
      element
      elementTitle
      symbol
      chemicalFormula
      phaseAtSTP
      density
      meltingPoint
      boilingPoint
      atomicNumber
      toxicity
      magneticProperty
      electricalConductivity
      group
      category
      period
      atomicWeight
      usage1
      usage2
      usage3
      usage4
      concentrationInEarthsCrust
      description
      username
    }
  }
`;

export const GET_ELEMENT = gql`
  query($id: ID!) {
    element(id: $id) {
      id
      element
      elementTitle
      chemicalFormula
      symbol
      phaseAtSTP
      group
      period
      category
      atomicNumber
      atomicWeight
      density
      meltingPoint
      boilingPoint
      electricalConductivity
      magneticProperty
      toxicity
      concentrationInEarthsCrust
      usage1
      usage2
      usage3
      usage4
      description
      username
    }
  }
`;

export const GET_ELEMENTS = gql`
  query(
    $ids: [ID!]
    $elementTitle: String
    $phaseAtSTP: String
    $toxicity: String
    $magneticProperty: String
    $electricalConductivity: String
    $group: String
    $category: String
    $period: String
    $users: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchElement(
      ids: $ids
      elementTitle: $elementTitle
      phaseAtSTP: $phaseAtSTP
      toxicity: $toxicity
      magneticProperty: $magneticProperty
      electricalConductivity: $electricalConductivity
      group: $group
      category: $category
      period: $period
      users: $users
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      elements {
        id
        element
        elementTitle
        symbol
        chemicalFormula
        phaseAtSTP
        density
        meltingPoint
        boilingPoint
        atomicNumber
        toxicity
        magneticProperty
        electricalConductivity
        group
        category
        period
        atomicWeight
        usage1
        usage2
        usage3
        usage4
        concentrationInEarthsCrust
        description
        username
      }
      totalCount
    }
  }
`;

export const REGISTER_ELEMENT = gql`
  mutation(
    $element: String!
    $elementTitle: String!
    $symbol: String!
    $chemicalFormula: String
    $phaseAtSTP: String
    $density: Float
    $meltingPoint: Float
    $boilingPoint: Float
    $atomicNumber: Float
    $toxicity: String
    $magneticProperty: String
    $electricalConductivity: String
    $group: String
    $category: String!
    $period: String
    $atomicWeight: Float
    $usage1: String
    $usage2: String
    $usage3: String
    $usage4: String
    $concentrationInEarthsCrust: Float
    $description: String
  ) {
    registerElement(
      element: $element
      elementTitle: $elementTitle
      symbol: $symbol
      chemicalFormula: $chemicalFormula
      phaseAtSTP: $phaseAtSTP
      density: $density
      meltingPoint: $meltingPoint
      boilingPoint: $boilingPoint
      atomicNumber: $atomicNumber
      toxicity: $toxicity
      magneticProperty: $magneticProperty
      electricalConductivity: $electricalConductivity
      group: $group
      category: $category
      period: $period
      atomicWeight: $atomicWeight
      usage1: $usage1
      usage2: $usage2
      usage3: $usage3
      usage4: $usage4
      concentrationInEarthsCrust: $concentrationInEarthsCrust
      description: $description
    ) {
      id
    }
  }
`;

export const UPDATE_ELEMENT = gql`
  mutation(
    $id: ID!
    $elementTitle: String!
    $symbol: String!
    $chemicalFormula: String
    $phaseAtSTP: String
    $density: Float
    $meltingPoint: Float
    $boilingPoint: Float
    $atomicNumber: Float
    $toxicity: String
    $magneticProperty: String
    $electricalConductivity: String
    $group: String
    $category: String!
    $period: String
    $atomicWeight: Float
    $usage1: String
    $usage2: String
    $usage3: String
    $usage4: String
    $concentrationInEarthsCrust: Float
    $description: String
  ) {
    updateElement(
      id: $id
      elementTitle: $elementTitle
      symbol: $symbol
      chemicalFormula: $chemicalFormula
      phaseAtSTP: $phaseAtSTP
      density: $density
      meltingPoint: $meltingPoint
      boilingPoint: $boilingPoint
      atomicNumber: $atomicNumber
      toxicity: $toxicity
      magneticProperty: $magneticProperty
      electricalConductivity: $electricalConductivity
      group: $group
      category: $category
      period: $period
      atomicWeight: $atomicWeight
      usage1: $usage1
      usage2: $usage2
      usage3: $usage3
      usage4: $usage4
      concentrationInEarthsCrust: $concentrationInEarthsCrust
      description: $description
    ) {
      result
    }
  }
`;

export const DELETE_ELEMENT = gql`
  mutation($id: ID!) {
    removeElement(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_ELEMENTS = gql`
  mutation($ids: [ID!]!) {
    multiRemoveElements(ids: $ids) {
      result
    }
  }
`;
