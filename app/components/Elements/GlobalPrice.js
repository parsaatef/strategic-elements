import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_GLOBAL_PRICES } from '../../queries/global-price';

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

class GlobalPrice extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <h4>قیمت جهانی {title}</h4>

        <Query
          query={GET_GLOBAL_PRICES}
          variables={{
            elements: [element],
            offset: 999
          }}
        >
          {({ data, loading }) => {
            if (loading) return 'loading.....';

            if (data && data.searchPrice && data.searchPrice.globalPrices) {
              return (
                <div>
                  <table className="table table-with-width table-striped table-bordered">
                    <tbody>
                      {data.searchPrice.globalPrices.map(item => (
                        <tr key={item.id}>
                          <td>{item.year}</td>
                          <td>{item.price}</td>
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

export default GlobalPrice;
