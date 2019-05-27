// @flow
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import PanelItem from '../components/General/PanelItem';
import { INFORMATION_ANALYSIS } from '../constants/routes';

type Props = {};

export default class InformationAnalysis extends Component<Props> {
  props: Props;

  render() {
    return (
      <section>
        <div className="smfp-intro-wrap">
          <div className="smfp-intro-wrap-inner">
            <div className="smfp-intro-heading">
              <h1>تحلیل اطلاعات</h1>
              <h3 className="sub-title">تحلیل اطلاعات مواد معدنی</h3>
            </div>

            <div className="smfp-admin-content">
              <Row>
                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={INFORMATION_ANALYSIS}
                  icon="smfpIcon smfpIcon-economical-analysis"
                  title="تحلیل اقتصادی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={INFORMATION_ANALYSIS}
                  icon="smfpIcon smfpIcon-strategic-analysis"
                  title="تحلیل راهبردی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={INFORMATION_ANALYSIS}
                  icon="smfpIcon smfpIcon-environment-analysis"
                  title="تحلیل محیط زیستی"
                />
              </Row>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
