import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Bar } from 'react-chartjs-2';
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
    const { match } = this.props;

    const { element, title } = match.params;

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
            offset: -1
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
                  secondaryProductionValue.push(100000);
                }
              });

              console.log('++++++++++++++++++++++++++++++++++++++');
              console.log(data);

              const ChartData = {
                labels: Year,
                datasets: [
                  {
                    label: 'تولید اولیه',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: productionValue
                  },
                  {
                    label: 'تولید ثانویه',
                    backgroundColor: 'rgba(99,255,132,0.2)',
                    borderColor: 'rgba(99,255,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(99,255,132,0.4)',
                    hoverBorderColor: 'rgba(99,255,132,1)',
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

                  <div className="smfp-line-chart-wrap smfp-chart-wrap">
                    <Bar
                      data={ChartData}
                      width={100}
                      height={50}
                      options={{
                        title: {
                          display: true,
                          text: 'Chart.js Bar Chart - Stacked'
                        },
                        tooltips: {
                          mode: 'index',
                          intersect: false
                        },
                        responsive: true,
                        scales: {
                          xAxes: [
                            {
                              stacked: true
                            }
                          ],
                          yAxes: [
                            {
                              stacked: true
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
                        <th>تولید</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.searchElementStats.elementsStats.map(item => (
                        <tr
                          key={item.id}
                          className="animated fadeInUp faster animation-auto-delay"
                        >
                          <td>{item.year}</td>
                          <td>{item.productionValue}</td>
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

export default Production;
