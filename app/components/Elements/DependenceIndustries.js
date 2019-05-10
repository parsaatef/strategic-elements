import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_OPTIONS } from '../../queries/option';

export const GET_ELEMENT_BY_NAME = gql`
  query($element: String!) {
    elementByName(element: $element) {
      id
      element
      elementTitle
      relatedIndustryDesc
    }
  }
`;

class DependenceIndustries extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <h4>صنایع وابسته {title}</h4>

        <Query
          query={GET_OPTIONS}
          variables={{
            element,
            type: 'dependence-industries',
            offset: 999
          }}
        >
          {({ data, loading }) => {
            if (loading) return 'loading.....';

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
              if (loading) return 'loading.....';

              console.log('data, error, refetch', data, error, refetch);

              return (
                <>
                  {data && data.elementByName && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.elementByName.relatedIndustryDesc
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
