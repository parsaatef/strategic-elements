import { gql } from 'apollo-boost';

export const GET_THREAT = gql`
  query($id: ID!) {
    threat(id: $id) {
      id
      effectivenessSanctions
      impactTariffs
      levelGovernmentalSupport
      diffRawMaterialValueAProcessedProduct
      moreInfo
      username
      element
    }
  }
`;

export const GET_THREATS = gql`
  query(
    $ids: [ID!]
    $effectivenessSanctions: String
    $impactTariffs: String
    $levelGovernmentalSupport: String
    $diffRawMaterialValueAProcessedProduct: String
    $moreInfo: String
    $users: [String!]
    $elements: [String!]
    $sort: String
    $sortBy: String
    $offset: Int
    $first: Int
  ) {
    searchThreats(
      ids: $ids
      effectivenessSanctions: $effectivenessSanctions
      impactTariffs: $impactTariffs
      levelGovernmentalSupport: $levelGovernmentalSupport
      diffRawMaterialValueAProcessedProduct: $diffRawMaterialValueAProcessedProduct
      moreInfo: $moreInfo
      users: $users
      elements: $elements
      sort: $sort
      sortBy: $sortBy
      offset: $offset
      first: $first
    ) {
      threats {
        id
        effectivenessSanctions
        impactTariffs
        levelGovernmentalSupport
        diffRawMaterialValueAProcessedProduct
        moreInfo
        username
        element
      }
      totalCount
    }
  }
`;

export const REGISTER_THREAT = gql`
  mutation(
    $effectivenessSanctions: String
    $impactTariffs: String
    $levelGovernmentalSupport: String
    $diffRawMaterialValueAProcessedProduct: String!
    $moreInfo: String
    $element: String!
  ) {
    registerThreat(
      effectivenessSanctions: $effectivenessSanctions
      impactTariffs: $impactTariffs
      levelGovernmentalSupport: $levelGovernmentalSupport
      diffRawMaterialValueAProcessedProduct: $diffRawMaterialValueAProcessedProduct
      moreInfo: $moreInfo
      element: $element
    ) {
      id
    }
  }
`;

export const UPDATE_THREAT = gql`
  mutation(
    $id: ID!
    $effectivenessSanctions: String
    $impactTariffs: String
    $levelGovernmentalSupport: String
    $diffRawMaterialValueAProcessedProduct: String!
    $moreInfo: String
    $element: String!
  ) {
    updateThreat(
      id: $id
      effectivenessSanctions: $effectivenessSanctions
      impactTariffs: $impactTariffs
      levelGovernmentalSupport: $levelGovernmentalSupport
      diffRawMaterialValueAProcessedProduct: $diffRawMaterialValueAProcessedProduct
      moreInfo: $moreInfo
      element: $element
    ) {
      result
    }
  }
`;

export const DELETE_THREAT = gql`
  mutation($id: ID!) {
    removeThreat(id: $id) {
      result
    }
  }
`;

export const MULTI_DELETE_THREATS = gql`
  mutation($ids: [ID!]!) {
    multiRemoveThreats(ids: $ids) {
      result
    }
  }
`;
