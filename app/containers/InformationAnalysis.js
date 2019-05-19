// @flow
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import PanelItem from '../components/General/PanelItem';
import { INFORMATION_ANALYSIS } from '../constants/routes';
import item1 from '../images/menu-item-1.jpg';
import item3 from '../images/menu-item-3.jpg';
import item4 from '../images/menu-item-4.jpg';
import InformationAnalysisManagement from '../components/bubble/InformationAnalysisManagement';

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
                  icon={item1}
                  title="تحلیل اقتصادی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={INFORMATION_ANALYSIS}
                  icon={item3}
                  title="تحلیل راهبردی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={INFORMATION_ANALYSIS}
                  icon={item4}
                  title="تحلیل محیط زیستی"
                />
              </Row>

              <InformationAnalysisManagement />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
