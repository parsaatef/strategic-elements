import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Bar } from 'react-chartjs-2';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import Select from '../General/Select';
import { GET_ELEMENTS_STATS } from '../../queries/elementStats';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';
import { getCountries } from '../../utils/utility';

const countryOptions = getCountries();

class Production extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      location: 'all'
    };
  }

  changeOptions(type, selectedOption) {
    this.setState({
      [type]: selectedOption.value
    });
  }

  render() {
    const { match, intl } = this.props;

    const { element, title } = match.params;

    const { formatNumber } = intl;

    const { location } = this.state;

    const locationOptions = countryOptions;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-global-price"
          title={`روند تولید ${title}`}
        />

        <Query
          query={GET_ELEMENTS_STATS}
          variables={{
            elements: [element],
            location,
            offset: -1,
            sortBy: 'year',
            sort: 'asc'
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (
              data &&
              data.searchElementStats &&
              data.searchElementStats.elementsStats
            ) {
              const Year = [];
              const productionValue = [];
              const secondaryProductionValue = [];

              data.searchElementStats.elementsStats.forEach(item => {
                Year.push(item.year);
                productionValue.push(item.productionValue);
                if (item.secondaryProductionValue != null) {
                  secondaryProductionValue.push(item.secondaryProductionValue);
                } else {
                  secondaryProductionValue.push(0);
                }
              });

              console.log('++++++++++++++++++++++++++++++++++++++');
              console.log(location);
              console.log(data);

              const ChartData = {
                labels: Year,
                datasets: [
                  {
                    label: 'تولید اولیه',
                    backgroundColor: 'rgba(26, 209, 239, 0.7)',
                    borderColor: 'rgba(26, 209, 239, 0.7)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(26, 209, 239, 1)',
                    hoverBorderColor: 'rgba(26, 209, 239, 1)',
                    data: productionValue
                  },
                  {
                    label: 'تولید ثانویه',
                    backgroundColor: 'rgba(234, 50, 118, 0.7)',
                    borderColor: 'rgba(234, 50, 118, 0.7)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(234, 50, 118, 1)',
                    hoverBorderColor: 'rgba(234, 50, 118, 1)',
                    data: secondaryProductionValue
                  }
                ]
              };

              return (
                <div>
                  <div className="filters">
                    <Row>
                      <Col
                        sm={12}
                        xs={12}
                        className="animated animation-fill-mode-backwards flipInX fast"
                      >
                        <div className="select-with-width">
                          <Select
                            options={locationOptions}
                            placeholder="انتخاب کشور"
                            onChange={this.changeOptions.bind(this, 'location')}
                            defaultValue={location}
                          />
                        </div>
                      </Col>

                      <Col sm={3} xs={6} className="animated flipInX fast" />
                    </Row>
                  </div>

                  <div className="smfp-bar-chart-wrap smfp-chart-wrap">
                    <Bar
                      data={ChartData}
                      width={100}
                      height={50}
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
                        <th>میزان تولید</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.searchElementStats.elementsStats.map(item => (
                        <tr
                          key={item.id}
                          className="animated fadeInUp faster animation-auto-delay"
                        >
                          <td>
                            {formatNumber(item.year, { useGrouping: false })}
                          </td>
                          <td>{formatNumber(item.productionValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            return null;
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

Production.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Production);
