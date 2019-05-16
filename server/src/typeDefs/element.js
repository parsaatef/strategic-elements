import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    element(id: ID!): Element @auth
    elementByName(element: String!): Element @auth
    elements: [Element!] @auth
    searchElement(
      ids: [ID!]
      elementTitle: String
      phaseAtSTP: String
      toxicity: Boolean
      magneticProperty: Boolean
      electricalConductivity: String
      group: String
      period: String
      users: [String!]
      sort: String
      sortBy: String
      first: Int
      offset: Int
    ): ElementsResult @auth
  }

  extend type Mutation {
    registerElement(
      element: String!
      elementTitle: String!
      symbol: String!
      chemicalFormula: String
      phaseAtSTP: String
      density: Float
      meltingPoint: Int
      boilingPoint: Int
      hardness: Float
      toxicity: Boolean
      magneticProperty: Boolean
      electricalConductivity: String
      group: String!
      period: String
      atomicWeight: Float
      electronegativity: Float
      oxidationStates: String
      electronConfiguration: String
      atomicRadius: Float
      concentrationInEarthsCrust: Float
      description: String
      relatedIndustryDesc: String
      technologyLevelDesc: String
      lowLevelIndustryDesc: String
      threatyDesc: String
      secondaryResourcesDesc: String
      ecologyDesc: String
    ): Element @auth
    updateElement(
      id: ID!
      elementTitle: String!
      symbol: String!
      chemicalFormula: String
      phaseAtSTP: String
      density: Float
      meltingPoint: Int
      boilingPoint: Int
      hardness: Float
      toxicity: Boolean
      magneticProperty: Boolean
      electricalConductivity: String
      group: String!
      period: String
      atomicWeight: Float
      electronegativity: Float
      oxidationStates: String
      electronConfiguration: String
      atomicRadius: Float
      concentrationInEarthsCrust: Float
      description: String
      relatedIndustryDesc: String
      technologyLevelDesc: String
      lowLevelIndustryDesc: String
      threatyDesc: String
      secondaryResourcesDesc: String
      ecologyDesc: String
    ): Result @auth
    removeElement(id: ID!): Result @auth
    multiRemoveElements(ids: [ID!]!): Result @auth
  }

  type ElementsResult {
    elements: [Element!]!
    totalCount: Int
  }

  type Element {
    id: ID!
    element: String!
    elementTitle: String!
    symbol: String!
    chemicalFormula: String
    phaseAtSTP: String
    density: Float
    meltingPoint: Int
    boilingPoint: Int
    hardness: Float
    toxicity: Boolean
    magneticProperty: Boolean
    electricalConductivity: String
    group: String!
    period: String
    atomicWeight: Float
    electronegativity: Float
    oxidationStates: String
    electronConfiguration: String
    atomicRadius: Float
    concentrationInEarthsCrust: Float
    description: String
    relatedIndustryDesc: String
    technologyLevelDesc: String
    lowLevelIndustryDesc: String
    threatyDesc: String
    secondaryResourcesDesc: String
    ecologyDesc: String
    username: String!
    createdAt: String!
    updatedAt: String!
  }
`;
