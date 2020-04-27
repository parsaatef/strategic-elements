import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_INDUSTRIES } from '../../queries/industry';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';
import { getQualityLevel, getIndustryTypes } from '../../utils/utility';
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

class DependenceIndustries extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-upstream-industry"
          title={`صنایع وابسته ${title}`}
        />

        <Query
          query={GET_INDUSTRIES}
          variables={{
            elements: [element],
            offset: -1
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchIndustries && data.searchIndustries.industries) {
              return (
                <div>
                  <table className="table table-lg-width table-striped table-bordered">
                    <thead>
                    <tr>
                      <th><FormattedMessage id="global.industry" /></th>
                      <th><FormattedMessage id="global.type" /></th>
                      <th><FormattedMessage id="global.strategicImportance" /></th>
                      <th><FormattedMessage id="global.economicSignificance" /></th>
                      <th><FormattedMessage id="global.jobCreationRate" /></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.searchIndustries.industries.map(item => (
                      <tr
                        key={item.id}
                        className="animated fadeInUp faster animation-auto-delay"
                      >
                        <td>{item.title}</td>
                        <td>{getIndustryTypes('option', item.type)}</td>
                        <td>{getQualityLevel('option', item.strategicImportance)}</td>
                        <td>{getQualityLevel('option', item.economicSignificance)}</td>
                        <td>{getQualityLevel('option', item.jobCreationRate)}</td>
                      </tr>
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

export default DependenceIndustries;
