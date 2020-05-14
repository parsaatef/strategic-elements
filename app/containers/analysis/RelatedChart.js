// @flow
import React, { Component } from 'react';
import _ from 'underscore';
import { Query } from 'react-apollo';
import { HorizontalBar } from 'react-chartjs-2';
import PageHeadingIcon from '../../components/General/PageHeadingIcon';
import { GET_ELEMENT_MIX_STATS_INFO } from '../../queries/elementStats';
import Loading from '../../components/General/Loading';
import { getStandardValueByUnit } from '../../utils/utility';

class RelatedChart extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      inputData: {}
    };
  }

  setData(statsByElements) {
    const elements = _.groupBy(statsByElements, stats => stats.element);

    const labels = [];

    const data = [];
    console.log('--------elements------', elements);

    const dataLabels = [];

    _.each(elements, statsByLocation => {
      // element

      const iranStats = statsByLocation.find(x => x.location === 'IRN');
       console.log("---iranStats---", iranStats);
      const worldStats = statsByLocation.find(x => x.location === 'all');
      //console.log("---worldStats---", worldStats);
      if (worldStats && iranStats) {
        const value = !iranStats.consumptionValue
          ? 0
          : Math.round(
              (getStandardValueByUnit(worldStats.importValue, worldStats.unit) /
                getStandardValueByUnit(
                  iranStats.consumptionValue,
                  iranStats.unit
                )) *
                100
            );

        let percentValue = 0;
        
        if (value >= 5) {
          percentValue = 100;  
        } else if (value > 1 && value < 5) {
          percentValue = Math.random((value - 1) * 25);  
        } else {
          percentValue = 0;
        }
        
        if (iranStats.elementInfo && iranStats.elementInfo.elementTitle) {
          dataLabels.push({
            element: iranStats.elementInfo.elementTitle,
            value: percentValue
          });
        }
      }
    });

    _.each(_.sortBy(dataLabels, 'value').reverse(), ({ element, value }) => {
      data.push(value);
      labels.push(element);
    });

    const inputData = {
      labels,
      datasets: [
        {
          label: 'درصد وابستگی',
          backgroundColor: 'rgba(26, 209, 239, 0.7)',
          borderColor: 'rgba(26, 209, 239, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(26, 209, 239, 1)',
          hoverBorderColor: 'rgba(26, 209, 239, 1)',
          data
        }
      ]
    };

    this.setState({
      inputData,
      statsByElements
    });
  }

  render() {
    const { inputData, statsByElements } = this.state;

    return (
      <section>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-details"
          title="میزان وابستگی"
        />

        <div className="smfp-horizontal-bar-chart-wrap smfp-chart-wrap">
          <Query
            query={GET_ELEMENT_MIX_STATS_INFO}
            variables={{
              offset: -1,
              first: 0,
              year: 2018,
              locations: ['IRN', 'all']
            }}
          >
            {({ data, loading, error }) => {
              if (loading) return <Loading />;

              if (error) console.error(error);

              if (!data || !data.statsByElements) return null;

              if (!_.isEqual(data.statsByElements, statsByElements)) {
                this.setData(data.statsByElements);
                return null;
              }

              return (
                <HorizontalBar
                  data={inputData}
                  height={420}
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
                      yPadding: 10
                      // callback: (value) => formatNumber(value, {useGrouping:false}),
                    },
                    responsive: true,
                    legend: {
                      display: false
                    },
                    scales: {
                      xAxes: [
                        {
                          stacked: true,
                          ticks: {
                            // Include a dollar sign in the ticks
                            // callback: (value) => formatNumber(value, {useGrouping:false}),
                            fontFamily: 'IranSans',
                            fontColor: '#fff'
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'امتیاز',
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
                          // stacked: true,
                          ticks: {
                            // Include a dollar sign in the ticks
                            // callback: (value) => formatNumber(value),
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
              );
            }}
          </Query>
        </div>
      </section>
    );
  }
}

export default RelatedChart;
