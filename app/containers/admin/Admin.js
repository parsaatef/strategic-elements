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

type Props = {};

export default class Admin extends Component<Props> {
  props: Props;

  render() {
    return (
      <section>
        <div className="smfp-admin-wrap">
          <div className="smfp-admin-wrap-inner">
            <div className="smfp-admin-heading text-center">
              <h1 className="animated fadeInDown fast delay-0-5s">
                مدیریت سامانه
              </h1>
              <h3 className="sub-title animated fadeInDown fast">
                به قسمت مدیریت خوش آمدید
              </h3>
            </div>

            <div className="smfp-admin-content">
              <Row>
                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={USERS_LIST}
                  icon="smfpIcon smfpIcon-user"
                  title="کاربر"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ELEMENTS_LIST}
                  icon="smfpIcon smfpIcon-element"
                  title="ماده معدنی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ELEMENTS_STATS_LIST}
                  icon="smfpIcon smfpIcon-element-stats"
                  title="تولید و مصرف"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={MINERALS_LIST}
                  icon="smfpIcon smfpIcon-mineral"
                  title="کانی ها"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={MINES_LIST}
                  icon="smfpIcon smfpIcon-mine"
                  title="معادن"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={GLOBAL_PRICES_LIST}
                  icon="smfpIcon smfpIcon-global-price"
                  title="قیمت جهانی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={SECONDARY_SOURCES_LIST}
                  icon="smfpIcon smfpIcon-secondary-sources"
                  title="منابع ثانویه"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={TECHNOLOGICAL_LEVEL_LIST}
                  icon="smfpIcon smfpIcon-technological-level"
                  title="سطح تکنولوژی"
                />

                <PanelItem
                  className="col-sm-4 col-xs-6"
                  link={ENVIRONMENT_LIST}
                  icon="smfpIcon smfpIcon-environment"
                  title="محیط‌زیست"
                />
              </Row>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
