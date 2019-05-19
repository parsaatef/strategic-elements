// @flow
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import PanelItem from '../../components/General/PanelItem';
import {
  ELEMENTS_LIST,
  ELEMENTS_STATS_LIST,
  ENVIRONMENT_LIST,
  GLOBAL_PRICES_LIST,
  MINERALS_LIST,
  MINES_LIST,
  SECONDARY_SOURCES_LIST,
  TECHNOLOGICAL_LEVEL_LIST,
  USERS_LIST
} from '../../constants/routes';
import item1 from '../../images/menu-item-1.jpg';
import item3 from '../../images/menu-item-3.jpg';
import item4 from '../../images/menu-item-4.jpg';

type Props = {};

export default class Admin extends Component<Props> {
  props: Props;

  render() {
    return (
      <section>
        <div className="smfp-admin-wrap">
          <div className="smfp-admin-wrap-inner">
            <div className="smfp-admin-heading text-center">
              <h1 className="animated bounceInDown slow delay-0-5s">
                مدیریت سامانه
              </h1>
              <h3 className="sub-title animated bounceInDown slow">
                به قسمت مدیریت خوش آمدید
              </h3>
            </div>

            <div className="smfp-admin-content">
              <Row>
                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={USERS_LIST}
                  icon={item1}
                  title="مدیریت کاربر"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ELEMENTS_LIST}
                  icon={item3}
                  title="مدیریت ماده معدنی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ELEMENTS_STATS_LIST}
                  icon={item4}
                  title="مدیریت آمار مواد معدنی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={MINERALS_LIST}
                  icon={item4}
                  title="مدیریت کانی ها"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={MINES_LIST}
                  icon={item3}
                  title="مدیریت معادن"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={GLOBAL_PRICES_LIST}
                  icon={item3}
                  title="مدیریت قیمت جهانی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={SECONDARY_SOURCES_LIST}
                  icon={item3}
                  title="مدیریت منابع ثانویه"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={TECHNOLOGICAL_LEVEL_LIST}
                  icon={item3}
                  title="مدیریت سطح تکنولوژی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ENVIRONMENT_LIST}
                  icon={item3}
                  title="مدیریت محیط‌زیست"
                />
              </Row>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
