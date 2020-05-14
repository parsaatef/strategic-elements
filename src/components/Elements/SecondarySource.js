import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_RESOURCES } from '../../queries/resource';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';
import { getCountries, getQualityLevel } from '../../utils/utility';

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

class SecondarySource extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-secondary-sources"
          title={`منابع ثانویه ${title}`}
        />

        <Query
          query={GET_RESOURCES}
          variables={{
            elements: [element],
            offset: -1
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchResource && data.searchResource.resources) {
              return (
                <div>
                  <table className="table table-with-width table-striped table-bordered">
                    <tbody>
                      {data.searchResource.resources.map(source => (
                        <tr
                          key={source.id}
                          className="animated fadeInUp faster animation-auto-delay"
                        >
                          <td>{getCountries('option', source.location)}</td>
                          <td>{getQualityLevel('option', source.secondarySource)}</td>
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

export default SecondarySource;
