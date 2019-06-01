// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  HOME,
  ANALYSIS_INTRO,
  INFORMATION_OF_WORLD,
  ADMIN
} from '../constants/routes';
import PanelItem from './General/PanelItem';

type Props = {};

class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="smfp-intro-page">
        <div className="smfp-intro-wrap">
          <div className="smfp-intro-wrap-inner">
            <div className="smfp-intro-heading">
              <h1 className="animated bounceInDown fast delay-0-5s">
                سامانه مدیریتی فناورانه پویا
              </h1>
              <h3 className="sub-title animated bounceInDown fast">
                منابع و ذخایر عناصر راهبردی
              </h3>
            </div>

            <div className="row smfp-intro-content">
              <PanelItem
                className="col-sm-4 col-xs-6 delay-1s"
                link={INFORMATION_OF_WORLD}
                icon="smfpIcon smfpIcon-illustrated-information"
                title="اطلاعات مصور"
              />

              <PanelItem
                className="col-sm-4 col-xs-6 delay-1-5s"
                link={ANALYSIS_INTRO}
                icon="smfpIcon smfpIcon-information-analysis"
                title="تحلیل اطلاعات"
              />

              <PanelItem
                className="col-sm-4 col-xs-6 delay-2s"
                link={ADMIN}
                icon="smfpIcon smfpIcon-admin"
                title="ادمین"
              />
            </div>

            <div className="site-info animated bounceInUp fast delay-2-5s">
              <Link className="imprint" to={HOME}>
                تمامی حقوق مادی و معنوی این اپ متعلق به سامانه مدیریتی فناورانه
                پویا میباشد.
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
