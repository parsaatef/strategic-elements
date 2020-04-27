import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_OPTIONS } from '../../queries/option';
import { GET_ENVIRONMENTS } from '../../queries/environment';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';
import { getQualityLevel } from '../../utils/utility';
import { FormattedMessage } from 'react-intl';

export const GET_ELEMENT_BY_NAME = gql`
  query($element: String!) {
    elementByName(element: $element) {
      id
      element
      elementTitle
      description
    }
  }
`;

class Environment extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-environment"
          title={`محیط زیست ${title}`}
        />

        <Query
          query={GET_ENVIRONMENTS}
          variables={{
            elements: [element],
            offset: -1,
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchEnvironments && data.searchEnvironments.environments) {
              return (
                <div>
                  <table className="table table-with-width table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>عامل محیط زیستی</th>
                        <th>میزان تاثیر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.searchEnvironments.environments.map(item => (
                        <>
                          <tr
                            key='waterConsumption'
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.waterConsumption" /></td>
                            <td>{getQualityLevel('option', item.waterConsumption)}</td>
                          </tr>
                          <tr
                            key='energyConsumption'
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.energyConsumption" /></td>
                            <td>{getQualityLevel('option', item.energyConsumption)}</td>
                          </tr>
                          <tr
                            key='greenhouseGasEmissions'
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.greenhouseGasEmissions" /></td>
                            <td>{getQualityLevel('option', item.greenhouseGasEmissions)}</td>
                          </tr>
                          <tr
                            key='risksWasteAWasteWater'
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.risksWasteAWasteWater" /></td>
                            <td>{getQualityLevel('option', item.risksWasteAWasteWater)}</td>
                          </tr>
                          <tr
                            key='productionProcessRisksHuman'
                            className="animated fadeInUp faster animation-auto-delay"
                          >
                            <td><FormattedMessage id="global.productionProcessRisksHuman" /></td>
                            <td>{getQualityLevel('option', item.productionProcessRisksHuman)}</td>
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
            {({ data, loading, error, refetch }) => {
              if (loading) return <Loading />;

              console.log('data, error, refetch', data, error, refetch);

              return (
                <>
                  {data && data.elementByName && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.elementByName.description
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

export default Environment;
