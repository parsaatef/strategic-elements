import { gql } from 'apollo-boost';

export const GET_ENVIRONMENT = gql`
  query($id: ID!) {
    environment(id: $id) {
      id
      waterConsumption
      energyConsumption
      greenhouseGasEmissions
      risksWasteAWasteWater
      productionProcessRisksHuman
      moreInfo
      username
      element
    }
  }
`;

export const GET_ENVIRONMENTS = gql`
  query(
    $ids: [ID!]
    $waterConsumption: String
    $energyConsumption: String
    $greenhouseGasEmissions: String
    $risksWasteAWasteWater: String
    $productionProcessRisksHuman: String
    $moreInfo: String
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchEnvironments(
      ids: $ids
      waterConsumption: $waterConsumption
      energyConsumption: $energyConsumption
      greenhouseGasEmissions: $greenhouseGasEmissions
      risksWasteAWasteWater: $risksWasteAWasteWater
      productionProcessRisksHuman: $productionProcessRisksHuman
      moreInfo: $moreInfo
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      environments {
        id
        waterConsumption
        energyConsumption
        greenhouseGasEmissions
        risksWasteAWasteWater
        productionProcessRisksHuman
        moreInfo
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_ENVIRONMENT = gql`
  mutation(
    $waterConsumption: String!
    $energyConsumption: String
    $greenhouseGasEmissions: String
    $risksWasteAWasteWater: String!
    $productionProcessRisksHuman: String
    $moreInfo: String
    $element: String!
  ) {
    registerEnvironment(
      waterConsumption: $waterConsumption
      energyConsumption: $energyConsumption
      greenhouseGasEmissions: $greenhouseGasEmissions
      risksWasteAWasteWater: $risksWasteAWasteWater
      productionProcessRisksHuman: $productionProcessRisksHuman
      moreInfo: $moreInfo
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_ENVIRONMENT = gql`
  mutation(
    $id: ID!
    $waterConsumption: String!
    $energyConsumption: String
    $greenhouseGasEmissions: String
    $risksWasteAWasteWater: String!
    $productionProcessRisksHuman: String
    $moreInfo: String
    $element: String!
  ) {
    updateEnvironment(
      id: $id
      waterConsumption: $waterConsumption
      energyConsumption: $energyConsumption
      greenhouseGasEmissions: $greenhouseGasEmissions
      risksWasteAWasteWater: $risksWasteAWasteWater
      productionProcessRisksHuman: $productionProcessRisksHuman
      moreInfo: $moreInfo
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_ENVIRONMENT = gql`
  mutation($id: ID!) {
    removeEnvironment(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_ENVIRONMENTS = gql`
  mutation($ids: [ID!]!) {
    multiRemoveEnvironments(ids: $ids) {
      result
    }
  }
`;
