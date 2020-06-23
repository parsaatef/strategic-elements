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
import withSession from './HOC/withSession';

type Props = {};

class Home extends Component<Props> {
  props: Props;

  render() {
    const { session } = this.props;

    const currentUser =
      session && session.getCurrentUser ? session.getCurrentUser : {};

    const col = currentUser && currentUser.role === 'admin' ? 4 : 6;  

    return (
      <div className="smfp-intro-page">
        <div className="smfp-intro-wrap">
          <div className="smfp-intro-wrap-inner">
            <div className="smfp-intro-heading">
              <h1 className="animated fadeInDown fast delay-0-5s">
                سامانه مواد معدنی راهبردی (سَمَر)
              </h1>
              <h3 className="sub-title animated fadeInDown fast">
                شناسایی مواد معدنی راهبردی
              </h3>
            </div>

            <div className="row smfp-intro-content">
              <PanelItem
                className={`col-sm-${col} col-xs-6 delay-1s`}
                link={INFORMATION_OF_WORLD}
                icon="smfpIcon smfpIcon-illustrated-information"
                title="داده‌نما"
              />

              <PanelItem
                className={`col-sm-${col} col-xs-6 delay-1-5s`}
                link={ANALYSIS_INTRO}
                icon="smfpIcon smfpIcon-information-analysis"
                title="تحلیل اطلاعات"
              />

              {(currentUser && currentUser.role === 'admin') && <PanelItem
                className={`col-sm-${col} col-xs-6 delay-2s`}
                link={ADMIN}
                icon="smfpIcon smfpIcon-admin"
                title="مدیریت"
              />}
            </div>

            <div className="site-info animated fadeInUp fast delay-2-5s">
              <Link className="imprint" to={HOME}>
              تمامی حقوق مادی و معنوی این اپ متعلق به سامانه مواد معدنی راهبردی (سَمَر) می‌باشد
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSession(Home);
