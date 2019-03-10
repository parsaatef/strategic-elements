import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    elementStats(id: ID!): ElementStats @guest
    elementsStats: [ElementStats!]! @guest
    statsByElement(element: String!): ElementStats @guest
  }

  extend type Mutation {
    registerElementStats(
      location: String!
      locationType: String!
      resourceValue: Int!
      productionValue: Int!
      consumptionValue: Int!
      exportValue: Int!
      importValue: Int!
      secondaryProductionValue: Int!
      mineCount: Int!
      year: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): ElementStats @guest
    updateElementStats(
      id: ID!
      location: String!
      locationType: String!
      resourceValue: Int!
      productionValue: Int!
      consumptionValue: Int!
      exportValue: Int!
      importValue: Int!
      secondaryProductionValue: Int!
      mineCount: Int!
      year: Int!
      unit: String!
      description: String!
      username: String!
      element: String!
    ): ElementStats @guest
  }

  type SecondaryResource {
    id: ID!
    title: String!
    value: Int!
    unit: String!
    description: String!
    username: String!
    type: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }

  type ElementStats {
    id: ID!
    location: String!
    locationType: String!
    resourceValue: Int!
    productionValue: Int!
    consumptionValue: Int!
    exportValue: Int!
    importValue: Int!
    secondaryProductionValue: Int!
    mineCount: Int!
    year: Int!
    unit: String!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }

  type Element {
    id: ID!
    element: String!
    elementTitle: String!
    symbol: String!
    chemicalFormula: String!
    PhaseAtSTP: String!
    Density: Float!
    meltingPoint: Int!
    boilingPoint: Int!
    hardness: Float!
    toxicity: Boolean!
    magneticProperty: Boolean!
    electricalConductivity: String!
    group: String!
    period: String!
    atomicWeight: Float!
    electronegativity: Float!
    oxidationStates: String!
    electronConfiguration: String!
    atomicRadius: Float!
    concentrationInEarthsCrust: Float!
    description: String!
    relatedIndustryDesc: String!
    technologyLevelDesc: String!
    lowLevelIndustryDesc: String!
    threatyDesc: String!
    secondaryResourcesDesc: String!
    ecologyDesc: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type Mineral {
    id: ID!
    title: String!
    formula: String!
    color: String!
    abundance: Float!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }

  type GlobalPrice {
    id: ID!
    price: Int!
    year: Int!
    unit: String!
    description: String!
    username: String!
    element: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type Options {
    id: ID!
    name: String!
    value: String!
    type: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type TotalStats {
    id: ID!
    name: String!
    value: String!
    year: Int!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }

  type Mine {
    id: ID!
    title: String!
    activeMines: Int!
    productionValue: Int!
    unit: String!
    description: String!
    username: String!
    element: String!
    createdAt: String!
    updatedAt: String!
  }
`;
