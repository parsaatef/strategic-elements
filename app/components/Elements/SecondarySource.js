import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_SECONDARY_SOURCES } from '../../queries/secondarySource';
import PageHeadingIcon from '../General/PageHeadingIcon';

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
          query={GET_SECONDARY_SOURCES}
          variables={{
            elements: [element],
            offset: -1
          }}
        >
          {({ data, loading }) => {
            if (loading) return 'loading.....';

            if (
              data &&
              data.searchSecondarySource &&
              data.searchSecondarySource.secondarySources
            ) {
              return (
                <div>
                  <table className="table table-with-width table-striped table-bordered">
                    <tbody>
                      {data.searchSecondarySource.secondarySources.map(
                        source => (
                          <tr key={source.id}>
                            <td>{source.title}</td>
                            <td>{source.value}</td>
                          </tr>
                        )
                      )}
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
              if (loading) return 'loading.....';

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
        </div>
      </div>
    );
  }
}

export default SecondarySource;
