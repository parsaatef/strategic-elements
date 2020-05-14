import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_TECHNOLOGIES } from '../../queries/technology';
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
      technologyLevelDesc
    }
  }
`;

class TechnologicalLevel extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-technological-level"
          title={`سطح تکنولوژی ${title}`}
        />

        <Query
          query={GET_TECHNOLOGIES}
          variables={{
            elements: [element],
            offset: -1,
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchTechnologies && data.searchTechnologies.technologies) {
              return (
                <div>
                  <table className="table table-lg-width table-striped table-bordered">
                    <thead>
                      <tr>
                        <th><FormattedMessage id="global.technology" /></th>
                        <th><FormattedMessage id="global.level" /></th>
                        <th><FormattedMessage id="global.strategicImportance" /></th>
                        <th><FormattedMessage id="global.availabilityInIran" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.searchTechnologies.technologies.map(option => (
                        <tr
                          key={option.id}
                          className="animated fadeInUp faster animation-auto-delay"
                        >
                          <td>{option.title}</td>
                          <td>{getQualityLevel('option', option.level)}</td>
                          <td>{getQualityLevel('option', option.strategicImportance)}</td>
                          <td>{getQualityLevel('option', option.availabilityInIran)}</td>
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
                        __html: data.elementByName.technologyLevelDesc
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

export default TechnologicalLevel;
