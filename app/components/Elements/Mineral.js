import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_MINERALS } from '../../queries/mineral';
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
      secondaryResourcesDesc
    }
  }
`;

class Mineral extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-mineral"
          title={`کانی ها ${title}`}
        />

        <Query
          query={GET_MINERALS}
          variables={{
            elements: [element],
            offset: -1
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchMineral && data.searchMineral.minerals) {
              return (
                <div>
                  <table className="table table-lg-width table-striped table-bordered">
                    <thead>
                      <tr>
                        <th><FormattedMessage id="global.title" /></th>
                        <th><FormattedMessage id="global.formula" /></th>
                        <th><FormattedMessage id="global.color" /></th>
                        <th><FormattedMessage id="global.abundance" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.searchMineral.minerals.map(source => (
                        <tr
                          key={source.id}
                          className="animated fadeInUp faster animation-auto-delay"
                        >
                          <td>{source.title}</td>
                          <td>{source.formula}</td>
                          <td>{source.color}</td>
                          <td>{getQualityLevel('option', source.abundance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
          }}
        </Query>

        {/* <div>
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
                        __html: data.elementByName.secondaryResourcesDesc
                      }}
                    />
                  )}
                </>
              );
            }}
          </Query>
        </div> */}
      </div>
    );
  }
}

export default Mineral;
