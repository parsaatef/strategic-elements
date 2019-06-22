// @flow
import React, { Component } from 'react';

import { HorizontalBar } from 'react-chartjs-2';
import PageHeadingIcon from '../../components/General/PageHeadingIcon';

type Props = {
  match: object
};

export default class AnalysisElement extends Component<Props> {
  props: Props;

  render() {
    const { match } = this.props;

    const { title } = match.params;

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(26, 209, 239, 0.7)',
          borderColor: 'rgba(26, 209, 239, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(26, 209, 239, 1)',
          hoverBorderColor: 'rgba(26, 209, 239, 1)',
          data: [3, 4, 2, 1, 5, 3, 4]
        },
        {
          label: 'My dataset 2',
          backgroundColor: 'rgba(234, 50, 118, 0.7)',
          borderColor: 'rgba(234, 50, 118, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(234, 50, 118, 1)',
          hoverBorderColor: 'rgba(234, 50, 118, 1)',
          data: [-3, -3, -4, -1, -5, -1, -4]
        }
      ]
    };

    return (
      <section>
        <PageHeadingIcon icon="smfpIcon smfpIcon-details" title={title} />

        <div className="smfp-horizontal-bar-chart-wrap smfp-chart-wrap">
          <HorizontalBar
            data={data}
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
        </div>
      </section>
    );
  }
}
