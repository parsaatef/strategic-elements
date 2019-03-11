import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    element(id: ID!): Element @guest
    elements: [Element!]! @guest
    searchElement(
      ids: [ID!]
      elementTitle: String
      PhaseAtSTP: String
      toxicity: Boolean
      magneticProperty: Boolean
      electricalConductivity: String
      group: String
      period: String
      users: [String!]
      sort: String
      sortBy: String
    ): [Element!]! @guest
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
      username: String!
    ): Element @guest
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
    ): Result @guest
    removeElement(id: ID!): Result @guest
    multiRemoveElements(ids: [ID!]!): Result @guest
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
