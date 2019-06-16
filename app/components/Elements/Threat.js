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
      threatyDesc
    }
  }
`;

class Threat extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element, title } = match.params;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-threats"
          title={`تهدیدها ${title}`}
        />

        <Query
          query={GET_OPTIONS}
          variables={{
            element,
            type: 'threat',
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
                        <tr
                          key={option.id}
                          className="animated fadeInUp faster animation-auto-delay"
                        >
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
            {({ data, loading }) => {
              if (loading) return <Loading />;

              return (
                <>
                  {data && data.elementByName && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.elementByName.threatyDesc
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

export default Threat;
