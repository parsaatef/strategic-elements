// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';
import PageHeadingIcon from '../../components/General/PageHeadingIcon';

type Props = {
  match: object,
  elementsRates: object
};

class AnalysisElement extends Component<Props> {
  props: Props;

  render() {
    const { match, elementsRates } = this.props;

    const { title, element } = match.params;

    const {
      p1,
      p2,
      p3,
      p4,
      e1,
      e2,
      e3,
      e4,
      e5,
      e6,
      e7,
      s1,
      s2,
      s3,
      t1,
      t2,
      en1,
      en2,
      en3,
      en4,
      en5,
      l1,
      l2,
      l3
    } = elementsRates[element];

    const data = {
      labels: [
        'وابستگی به سایر کشورها',
        'تهدید روابط بین‌الملل',
        'اهمیت راهبردی',
        'تأثیر انحصار',
        'مقدار منابع اولیه در ایران',
        'ارزش اقتصادی',
        'میزان مصرف داخلی',
        'پتانسیل صادرات',
        'تفاوت ارزش مادۀ خام و محصول فرآوری‌شده',
        'میزان تأثیرگذاری بر صنایع',
        'دسترسی به منابع ثانویه',
        'میزان اشتغال‌زایی',
        'پراکندگی کشوری',
        'تأثیر در محرومیت‌زدایی منطقه‌ای',
        'محدودیت فناوری‌ها',
        'ناتوانی در تولید ثانویه',
        'بهینه‎بودن مصرف آب',
        'بهینه‎بودن مصرف انرژی',
        'بهینه‎بودن تولید گازهای گلخانه‌ای',
        'کم‎خطربودن پسماند و پساب',
        'ایمنی فرآیند تولید برای نیروی انسانی',
        'اثرپذیری از تحریم‌ها',
        'تاثیر تعرفه‌های واردات و صادرات',
        'کمبود حمایت‌های دولتی'
      ],
      datasets: [
        {
          label: '',
          backgroundColor: 'rgba(26, 209, 239, 0.7)',
          borderColor: 'rgba(26, 209, 239, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(26, 209, 239, 1)',
          hoverBorderColor: 'rgba(26, 209, 239, 1)',
          data: [
            0,
            0,
            p3,
            0,
            e1,
            e2,
            e3,
            e4,
            e5,
            e6,
            e7,
            s1,
            s2,
            s3,
            t1,
            t2,
            en1,
            en2,
            en3,
            en4,
            en5,
            0,
            0,
            0,
            5
          ]
        },
        {
          label: '',
          backgroundColor: 'rgba(234, 50, 118, 0.7)',
          borderColor: 'rgba(234, 50, 118, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(234, 50, 118, 1)',
          hoverBorderColor: 'rgba(234, 50, 118, 1)',
          data: [
            -p1,
            -p2,
            0,
            -p4,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            -l1,
            -l2,
            -l3,
            -5
          ]
        }
      ]
    };

    return (
      <section>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-details"
          title={`تحلیل اطلاعات ماده معدنی ${title}`}
        />

        <div className="smfp-horizontal-bar-chart-wrap smfp-chart-wrap">
          <HorizontalBar
            data={data}
            height={220}
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

const mapStateToProps = state => ({
  elementsRates: state.analysis.elementsRates
});

export default connect(mapStateToProps)(AnalysisElement);
