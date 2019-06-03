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
      hardness
      toxicity
      magneticProperty
      electricalConductivity
      group
      category
      period
      atomicWeight
      electronegativity
      oxidationStates
      electronConfiguration
      atomicRadius
      concentrationInEarthsCrust
      description
      relatedIndustryDesc
      technologyLevelDesc
      lowLevelIndustryDesc
      threatyDesc
      secondaryResourcesDesc
      ecologyDesc
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
      symbol
      chemicalFormula
      phaseAtSTP
      density
      meltingPoint
      boilingPoint
      hardness
      toxicity
      magneticProperty
      electricalConductivity
      group
      category
      period
      atomicWeight
      electronegativity
      oxidationStates
      electronConfiguration
      atomicRadius
      concentrationInEarthsCrust
      description
      relatedIndustryDesc
      technologyLevelDesc
      lowLevelIndustryDesc
      threatyDesc
      secondaryResourcesDesc
      ecologyDesc
      username
    }
  }
`;

export const GET_ELEMENTS = gql`
  query(
    $ids: [ID!]
    $elementTitle: String
    $phaseAtSTP: String
    $toxicity: Boolean
    $magneticProperty: Boolean
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
        hardness
        toxicity
        magneticProperty
        electricalConductivity
        group
        category
        period
        atomicWeight
        electronegativity
        oxidationStates
        electronConfiguration
        atomicRadius
        concentrationInEarthsCrust
        description
        relatedIndustryDesc
        technologyLevelDesc
        lowLevelIndustryDesc
        threatyDesc
        secondaryResourcesDesc
        ecologyDesc
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
    $meltingPoint: Int
    $boilingPoint: Int
    $hardness: Float
    $toxicity: Boolean
    $magneticProperty: Boolean
    $electricalConductivity: String
    $group: String!
    $category: String!
    $period: String
    $atomicWeight: Float
    $electronegativity: Float
    $oxidationStates: String
    $electronConfiguration: String
    $atomicRadius: Float
    $concentrationInEarthsCrust: Float
    $description: String
    $relatedIndustryDesc: String
    $technologyLevelDesc: String
    $lowLevelIndustryDesc: String
    $threatyDesc: String
    $secondaryResourcesDesc: String
    $ecologyDesc: String
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
      hardness: $hardness
      toxicity: $toxicity
      magneticProperty: $magneticProperty
      electricalConductivity: $electricalConductivity
      group: $group
      category: $category
      period: $period
      atomicWeight: $atomicWeight
      electronegativity: $electronegativity
      oxidationStates: $oxidationStates
      electronConfiguration: $electronConfiguration
      atomicRadius: $atomicRadius
      concentrationInEarthsCrust: $concentrationInEarthsCrust
      description: $description
      relatedIndustryDesc: $relatedIndustryDesc
      technologyLevelDesc: $technologyLevelDesc
      lowLevelIndustryDesc: $lowLevelIndustryDesc
      threatyDesc: $threatyDesc
      secondaryResourcesDesc: $secondaryResourcesDesc
      ecologyDesc: $ecologyDesc
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
    $meltingPoint: Int
    $boilingPoint: Int
    $hardness: Float
    $toxicity: Boolean
    $magneticProperty: Boolean
    $electricalConductivity: String
    $group: String!
    $category: String!
    $period: String
    $atomicWeight: Float
    $electronegativity: Float
    $oxidationStates: String
    $electronConfiguration: String
    $atomicRadius: Float
    $concentrationInEarthsCrust: Float
    $description: String
    $relatedIndustryDesc: String
    $technologyLevelDesc: String
    $lowLevelIndustryDesc: String
    $threatyDesc: String
    $secondaryResourcesDesc: String
    $ecologyDesc: String
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
      hardness: $hardness
      toxicity: $toxicity
      magneticProperty: $magneticProperty
      electricalConductivity: $electricalConductivity
      group: $group
      category: $category
      period: $period
      atomicWeight: $atomicWeight
      electronegativity: $electronegativity
      oxidationStates: $oxidationStates
      electronConfiguration: $electronConfiguration
      atomicRadius: $atomicRadius
      concentrationInEarthsCrust: $concentrationInEarthsCrust
      description: $description
      relatedIndustryDesc: $relatedIndustryDesc
      technologyLevelDesc: $technologyLevelDesc
      lowLevelIndustryDesc: $lowLevelIndustryDesc
      threatyDesc: $threatyDesc
      secondaryResourcesDesc: $secondaryResourcesDesc
      ecologyDesc: $ecologyDesc
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
