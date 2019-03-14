// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  COUNTER,
  USER_REGISTER,
  ADD_NEW_ELEMENT,
  ADD_NEW_ELEMENT_FCS,
  ELEMENT_DETAIL_FOR_WORLD,
  INFORMATION_OF_ELEMENT,
  INFORMATION_OF_IRAN,
  INFORMATION_OF_WORLD,
  ADD_NEW_USER,
  USERS_LIST,
  PROFILE
} from '../constants/routes';
import item1 from '../images/menu-item-1.jpg';
import item3 from '../images/menu-item-3.jpg';
import item4 from '../images/menu-item-4.jpg';
import styles from './Home.css';
import SPD from './Elements/SPD';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <SPD />
        <div className={styles.container} data-tid="container">
          <h2>HOME PAGE</h2>
          <Link to={COUNTER}>to Counter</Link>
          <br />
          <Link to={USER_REGISTER}>to Add User</Link>
          <br />
          <Link to={ADD_NEW_ELEMENT}>to ADD_NEW_ELEMENT</Link>
          <br />
          <Link to={ADD_NEW_ELEMENT_FCS}>to AddNewElementFCS</Link>
          <br />
          <Link to={ELEMENT_DETAIL_FOR_WORLD}>to ELEMENT_DETAIL_FOR_WORLD</Link>
          <br />
          <Link to={INFORMATION_OF_ELEMENT}>to INFORMATION_OF_ELEMENT</Link>
          <br />
          <Link to={INFORMATION_OF_IRAN}>to INFORMATION_OF_IRAN</Link>
          <br />
          <Link to={INFORMATION_OF_WORLD}>to INFORMATION_OF_WORLD</Link>
          <br />
          <Link to={ADD_NEW_USER}>to ADD_NEW_USER</Link>
          <br />
          <Link to={USERS_LIST}>to USERS_LIST</Link>
          <br />
          <Link to={PROFILE}>to PROFILE</Link>

          <h3>سامانه فناورانه پویا</h3>
          <i className="fa fa-edit" />
        </div>

        <div className="smfp-intro-page">
          <div className="smfp-intro-wrap">
            <div className="smfp-intro-wrap-inner">
              <div className="smfp-intro-heading">
                <h1>سامانه مدیریتی فناورانه پویا</h1>
                <h3 className="sub-title">منابع و ذخایر عناصر راهبردی</h3>
              </div>

              <div className="row smfp-intro-content">
                <div className="col-sm-4 col-xs-6">
                  <Link
                    className="smfp-main-item-wrap"
                    to={INFORMATION_OF_WORLD}
                  >
                    <div className="img">
                      <img src={item1} alt="img" />
                    </div>
                    <div className="title">
                      <h2>منابع و ذخایر</h2>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-4 col-xs-6">
                  <Link
                    className="smfp-main-item-wrap"
                    to={INFORMATION_OF_WORLD}
                  >
                    <div className="img">
                      <img src={item3} alt="img" />
                    </div>
                    <div className="title">
                      <h2>تحلیل اطلاعات</h2>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-4 col-xs-6">
                  <Link className="smfp-main-item-wrap" to={PROFILE}>
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
                <a href="http://localhost/SMFP/page-1.html" className="imprint">
                  تمامی حقوق مادی و معنوی این اپ مطعلق به سامانه مدیریتی
                  فناورانه پویا میباشد.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
