import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {

  }

  extend type Mutation {

  }

  type Result {
    result: Boolean!
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
`;
