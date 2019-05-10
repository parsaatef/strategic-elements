import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_MINERALS } from '../../queries/mineral';

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

    const { element } = match.params;

    return (
      <div>
        <h4>کانی ها {element}</h4>

        <Query
          query={GET_MINERALS}
          variables={{
            elements: [element],
            offset: -1
          }}
        >
          {({ data, loading }) => {
            if (loading) return 'loading.....';

            if (data && data.searchMineral && data.searchMineral.minerals) {
              return (
                <div>
                  <table className="table table-with-width table-striped table-bordered">
                    <tbody>
                      {data.searchMineral.minerals.map(source => (
                        <tr key={source.id}>
                          <td>{source.title}</td>
                          <td>{source.formula}</td>
                          <td>{source.color}</td>
                          <td>{source.abundance}</td>
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
        </div> */}
      </div>
    );
  }
}

export default Mineral;
