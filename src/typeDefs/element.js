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
      toxicity: String
      magneticProperty: String
      electricalConductivity: String
      group: String
      category: String
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
      meltingPoint: Float
      boilingPoint: Float
      toxicity: String
      magneticProperty: String
      electricalConductivity: String
      group: String
      category: String!
      period: String
      atomicWeight: Float
      atomicNumber: Float
      usage1: String
      usage2: String
      usage3: String
      usage4: String
      concentrationInEarthsCrust: Float
      description: String
    ): Element @auth
    updateElement(
      id: ID!
      elementTitle: String!
      symbol: String!
      chemicalFormula: String
      phaseAtSTP: String
      density: Float
      meltingPoint: Float
      boilingPoint: Float
      toxicity: String
      magneticProperty: String
      electricalConductivity: String
      group: String
      category: String!
      period: String
      atomicWeight: Float
      atomicNumber: Float
      usage1: String
      usage2: String
      usage3: String
      usage4: String
      concentrationInEarthsCrust: Float
      description: String
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
    meltingPoint: Float
    boilingPoint: Float
    toxicity: String
    magneticProperty: String
    electricalConductivity: String
    group: String
    category: String!
    period: String
    atomicWeight: Float
    atomicNumber: Float
    usage1: String
    usage2: String
    usage3: String
    usage4: String
    concentrationInEarthsCrust: Float
    description: String
    username: String!
    createdAt: String!
    updatedAt: String!
  }
`;
