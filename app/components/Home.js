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
              <h1>سامانه مدیریتی فناورانه پویا</h1>
              <h3 className="sub-title">منابع و ذخایر عناصر راهبردی</h3>
            </div>

            <div className="row smfp-intro-content">
              <PanelItem
                className="col-sm-4 col-xs-6"
                link={INFORMATION_OF_WORLD}
                icon={item1}
                title="اطلاعات مصور"
              />

              <PanelItem
                className="col-sm-4 col-xs-6"
                link={INFORMATION_ANALYSIS}
                icon={item3}
                title="تحلیل اطلاعات"
              />

              <PanelItem
                className="col-sm-4 col-xs-6"
                link={ADMIN}
                icon={item4}
                title="ادمین"
              />
            </div>

            <div className="site-info">
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
