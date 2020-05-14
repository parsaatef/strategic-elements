import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_THREATS } from '../../queries/threat';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';
import { FormattedMessage } from 'react-intl';
import { getQualityLevel } from '../../utils/utility';

export const GET_ELEMENT_BY_NAME = gql`
  query($element: String!) {
    elementByName(element: $element) {
      id
      element
      elementTitle
      threatyDesc
    }
  }
`;

class Threat extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-threats"
          title={`تهدیدها ${title}`}
        />

        <Query
          query={GET_THREATS}
          variables={{
            elements: [element],
            offset: -1,
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchThreats && data.searchThreats.threats) {
              return (
                <div>
                  <table className="table table-with-width table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>تهدید</th>
                        <th>میزان تاثیر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.searchThreats.threats.map(item => (
                        <>
                          <tr
                            key={item.effectivenessSanctions}
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.effectivenessSanctions" /></td>
                            <td>{getQualityLevel('option', item.effectivenessSanctions)}</td>
                          </tr>
                          <tr
                            key={item.impactTariffs}
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.impactTariffs" /></td>
                            <td>{getQualityLevel('option', item.impactTariffs)}</td>
                          </tr>
                          <tr
                            key={item.levelGovernmentalSupport}
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.levelGovernmentalSupport" /></td>
                            <td>{getQualityLevel('option', item.levelGovernmentalSupport)}</td>
                          </tr>
                          <tr
                            key={item.diffRawMaterialValueAProcessedProduct}
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.diffRawMaterialValueAProcessedProduct" /></td>
                            <td>{getQualityLevel('option', item.diffRawMaterialValueAProcessedProduct)}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
          }}
        </Query>

        <div>
          <Query
            query={GET_ELEMENT_BY_NAME}
            variables={{
              element
            }}
          >
            {({ data, loading }) => {
              if (loading) return <Loading />;

              return (
                <>
                  {data && data.elementByName && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.elementByName.threatyDesc
                      }}
                    />
                  )}
                </>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Threat;
