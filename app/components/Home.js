// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  HOME,
  INFORMATION_ANALYSIS,
  INFORMATION_OF_WORLD,
  ADMIN
} from '../constants/routes';
import item1 from '../images/menu-item-1.jpg';
import item3 from '../images/menu-item-3.jpg';
import item4 from '../images/menu-item-4.jpg';

type Props = {};

export default class Home extends Component<Props> {
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
              <div className="col-sm-4 col-xs-6">
                <Link className="smfp-main-item-wrap" to={INFORMATION_OF_WORLD}>
                  <div className="img">
                    <img src={item1} alt="img" />
                  </div>
                  <div className="title">
                    <h2>اطلاعات مصور</h2>
                  </div>
                </Link>
              </div>
              <div className="col-sm-4 col-xs-6">
                <Link className="smfp-main-item-wrap" to={INFORMATION_ANALYSIS}>
                  <div className="img">
                    <img src={item3} alt="img" />
                  </div>
                  <div className="title">
                    <h2>تحلیل اطلاعات</h2>
                  </div>
                </Link>
              </div>
              <div className="col-sm-4 col-xs-6">
                <Link className="smfp-main-item-wrap" to={ADMIN}>
                  <div className="img">
                    <img src={item4} alt="img" />
                  </div>
                  <div className="title">
                    <h2>ادمین</h2>
                  </div>
                </Link>
              </div>
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
