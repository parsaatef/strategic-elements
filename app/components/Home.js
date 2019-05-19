// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  HOME,
  INFORMATION_ANALYSIS,
  INFORMATION_OF_WORLD,
  ADMIN
} from '../constants/routes';
import PanelItem from './General/PanelItem';
import item1 from '../images/menu-item-1.jpg';
import item3 from '../images/menu-item-3.jpg';
import item4 from '../images/menu-item-4.jpg';

type Props = {};

class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="smfp-intro-page">
        <div className="smfp-intro-wrap">
          <div className="smfp-intro-wrap-inner">
            <div className="smfp-intro-heading">
              <h1 className="animated bounceInDown slow delay-0-5s">
                سامانه مدیریتی فناورانه پویا
              </h1>
              <h3 className="sub-title animated bounceInDown slow">
                منابع و ذخایر عناصر راهبردی
              </h3>
            </div>

            <div className="row smfp-intro-content">
              <PanelItem
                className="col-sm-4 col-xs-6 delay-1s"
                link={INFORMATION_OF_WORLD}
                icon={item1}
                title="اطلاعات مصور"
              />

              <PanelItem
                className="col-sm-4 col-xs-6 delay-1-5s"
                link={INFORMATION_ANALYSIS}
                icon={item3}
                title="تحلیل اطلاعات"
              />

              <PanelItem
                className="col-sm-4 col-xs-6 delay-2s"
                link={ADMIN}
                icon={item4}
                title="ادمین"
              />
            </div>

            <div className="site-info animated bounceInUp slow delay-2-5s">
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
