// @flow
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import PanelItem from '../../components/General/PanelItem';
import {
  ANALYSIS_FACTOR,
  ANALYSIS_RELATED_CHART
} from '../../constants/routes';

type Props = {};

export default class AnalysisIntro extends Component<Props> {
  props: Props;

  render() {
    return (
      <section>
        <div className="smfp-analysis-intro-wrap">
          <div className="smfp-analysis-intro-wrap-inner">
            <div className="smfp-analysis-intro-heading text-center">
              <h1 className="animated fadeInDown fast delay-0-5s">
                تحلیل اطلاعات
              </h1>
              <h3 className="sub-title animated fadeInDown fast">
                تحلیل اطلاعات مواد معدنی
              </h3>
            </div>

            <div className="smfp-analysis-intro-content">
              <Row>
                <PanelItem
                  className="col-sm-3 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'strategic')}
                  icon="smfpIcon smfpIcon-political-analysis"
                  title="تحلیل راهبردی"
                />

                <PanelItem
                  className="col-sm-3 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'economic')}
                  icon="smfpIcon smfpIcon-economical-analysis"
                  title="تحلیل اقتصادی"
                />

                <PanelItem
                  className="col-sm-3 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'develop')}
                  icon="smfpIcon smfpIcon-technology-analysis"
                  title="تحلیل توسعه پایدار"
                />

                <PanelItem
                  className="col-sm-3 col-xs-6"
                  link={ANALYSIS_RELATED_CHART}
                  icon="smfpIcon smfpIcon-legal-analysis"
                  title="نمودار وابستگی"
                />
              </Row>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
