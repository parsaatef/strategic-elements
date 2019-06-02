import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_OPTIONS } from '../../queries/option';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';

export const GET_ELEMENT_BY_NAME = gql`
  query($element: String!) {
    elementByName(element: $element) {
      id
      element
      elementTitle
      ecologyDesc
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
          query={GET_OPTIONS}
          variables={{
            element,
            type: 'environment',
            offset: -1
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchOptions && data.searchOptions.options) {
              return (
                <div>
                  <table className="table table-with-width table-striped table-bordered">
                    <tbody>
                      {data.searchOptions.options.map(option => (
                        <tr key={option.id}>
                          <td>{option.name}</td>
                          <td>{option.value}</td>
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
                        __html: data.elementByName.ecologyDesc
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
