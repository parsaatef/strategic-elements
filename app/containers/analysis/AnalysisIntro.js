// @flow
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import PanelItem from '../../components/General/PanelItem';
import { ANALYSIS_FACTOR } from '../../constants/routes';

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
                  className="col-sm-4 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'economic')}
                  icon="smfpIcon smfpIcon-economical-analysis"
                  title="اهمیت اقتصادی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'politic')}
                  icon="smfpIcon smfpIcon-political-analysis"
                  title="اهمیت سیاسی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'socialist')}
                  icon="smfpIcon smfpIcon-social-analysis"
                  title="عوامل اجتماعی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'technology')}
                  icon="smfpIcon smfpIcon-technology-analysis"
                  title="دسترسی به تکنولوژی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'environment')}
                  icon="smfpIcon smfpIcon-environment-analysis"
                  title="اثرات محیط زیستی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ANALYSIS_FACTOR.replace(':type', 'law_issue')}
                  icon="smfpIcon smfpIcon-legal-analysis"
                  title="مسائل قانونی"
                />
              </Row>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
