import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Line } from 'react-chartjs-2';
import { injectIntl, intlShape } from 'react-intl';
import { GET_GLOBAL_PRICES } from '../../queries/global-price';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';

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
    const { match, intl } = this.props;

    const { element, title } = match.params;

    const { formatNumber } = intl;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-global-price"
          title={`قیمت جهانی ${title}`}
        />

        <Query
          query={GET_GLOBAL_PRICES}
          variables={{
            elements: [element],
            offset: -1
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchPrice && data.searchPrice.globalPrices) {
              const Year = [];
              const price = [];

              data.searchPrice.globalPrices.forEach(item => {
                Year.push(item.year);
                price.push(item.price);
              });

              const chartData = {
                labels: Year,
                datasets: [
                  {
                    label: 'روند قیمت جهانی',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(222, 234, 146, 0.4)',
                    borderColor: '#deea92',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#deea92',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 4,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#deea92',
                    pointHoverBorderColor: 'rgba(222, 234, 146, 0.2)',
                    pointHoverBorderWidth: 5,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: price
                  }
                ]
              };

              console.log(Year);
              console.log(price);

              return (
                <div>
                  <div className="smfp-line-chart-wrap smfp-chart-wrap">
                    <Line
                      data={chartData}
                      options={{
                        tooltips: {
                          mode: 'index',
                          intersect: false,
                          titleFontFamily: 'IranSans',
                          bodyFontFamily: 'IranSans',
                          titleFontSize: 10,
                          bodyFontSize: 10,
                          titleMarginBottom: 10,
                          xPadding: 10,
                          yPadding: 10,
                          callback: value =>
                            formatNumber(value, { useGrouping: false })
                        },
                        responsive: true,
                        legend: {
                          labels: {
                            // This more specific font property overrides the global property
                            fontColor: '#fff',
                            fontFamily: 'IranSans',
                            fontSize: 10
                          }
                        },
                        scales: {
                          xAxes: [
                            {
                              stacked: true,
                              ticks: {
                                // Include a dollar sign in the ticks
                                callback: value =>
                                  formatNumber(value, { useGrouping: false }),
                                fontFamily: 'IranSans',
                                fontColor: '#fff'
                              },
                              scaleLabel: {
                                display: true,
                                labelString: 'سال',
                                fontColor: '#fff',
                                fontFamily: 'IranSans'
                              },
                              gridLines: {
                                display: true,
                                color: 'rgba(255, 255, 255, 0.1)'
                              }
                            }
                          ],
                          yAxes: [
                            {
                              stacked: true,
                              ticks: {
                                // Include a dollar sign in the ticks
                                callback: value => formatNumber(value),
                                fontFamily: 'IranSans',
                                fontColor: '#fff'
                              },
                              gridLines: {
                                display: true,
                                color: 'rgba(255, 255, 255, 0.1)'
                              }
                            }
                          ]
                        }
                      }}
                    />
                  </div>

                  <table className="table table-with-width table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>سال</th>
                        <th>قیمت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.searchPrice.globalPrices.map(item => (
                        <tr
                          key={item.id}
                          className="animated fadeInUp faster animation-auto-delay"
                        >
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

GlobalPrice.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(GlobalPrice);
