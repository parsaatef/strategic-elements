import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  HOME,
  MINERALS_LIST,
  MINES_LIST,
  ELEMENTS_LIST,
  GLOBAL_PRICES_LIST,
  SECONDARY_SOURCES_LIST,
  EXPORT_LIST,
  IMPORT_LIST,
  WORLD_PRODUCTION_LIST,
  WORLD_CONSUMPTION_LIST,
  INDUSTRY_LIST,
  TECHNOLOGICAL_LEVEL_LIST,
  SECONDARY_PRODUCTION_LIST,
  THREATS_LIST,
  INTERNATIONAL_RELATIONS_LIST,
  ENVIRONMENT_LIST,
  INFORMATION_OF_WORLD,
  USERS_LIST,
  ELEMENTS_STATS_LIST,
  USER_REGISTER,
  ANALYSIS_INTRO,
  ADMIN,
  ANALYSIS_FACTOR,
  ANALYSIS_RELATED_CHART
} from '../../constants/routes';
import logo from '../../images/logo.jpg';
import classie from '../../assets/js/MultiLevelMenu/classie';
import MLMenu from '../../assets/js/MultiLevelMenu/main';
import '../../assets/css/MultiLevelMenu/component.css';
import withSession from '../HOC/withSession';
// import Signout from '../Auth/Signout';

class Menu extends Component<Props> {
  componentDidMount() {
    const menuEl = document.getElementById('ml-menu');

    const { location } = this.props;

    this.mlMenu = new MLMenu(menuEl, {
      // breadcrumbsCtrl : true, // show breadcrumbs
      initialBreadcrumb: 'خانه', // initial breadcrumb text
      backCtrl: true, // show back button
      direction: 'l2r', // direction
      location
      // itemsDelayInterval : 60, // delay between each menu item sliding animation
    });

    // mobile menu toggle
    const openMenuCtrl = document.querySelector('.action--open');

    const closeMenuCtrl = document.querySelector('.action--close');

    openMenuCtrl.addEventListener('click', openMenu);

    closeMenuCtrl.addEventListener('click', closeMenu);

    function openMenu() {
      classie.add(menuEl, 'menu--open');
      closeMenuCtrl.focus();
    }

    function closeMenu() {
      classie.remove(menuEl, 'menu--open');
      openMenuCtrl.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (prevProps.location.pathname !== location.pathname) {
      this.mlMenu.setCurrentMenu(location, true);
    }
  }

  render() {
    const { session } = this.props;

    const currentUser =
      session && session.getCurrentUser ? session.getCurrentUser : {};

    const currentUserId = currentUser && currentUser.id ? currentUser.id : 0;

    return (
      <div className="smfp-header-wrap">
        <header className="smfp-header">
          <Link className="smfp-logo-link" to={HOME}>
            <div className="smfp-logo">
              <img src={logo} className="smfp-App-logo" alt="logo" />
            </div>
          </Link>
        </header>

        {/* <Signout /> */}

        <button
          type="button"
          className="action action--open"
          aria-label="Open Menu"
        >
          <span className="icon icon--menu" />
        </button>

        <nav id="ml-menu" className="menu smfp-menu">
          <button
            type="button"
            className="action action--close"
            aria-label="Close Menu"
          >
            <span className="icon icon--cross" />
          </button>
          <div className="menu__wrap">
            <ul
              data-menu="main"
              className="menu__level menu__main submenu__img"
              tabIndex="-1"
              role="menu"
              aria-label="خانه"
            >
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={INFORMATION_OF_WORLD}
                >
                  <div className="icon-wrap">
                    <i className="smfpIcon smfpIcon-illustrated-information" />
                  </div>
                  <span className="title">داده نما</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  data-submenu="submenu-2"
                  aria-owns="submenu-2"
                  to={ANALYSIS_INTRO}
                >
                  <div className="icon-wrap">
                    <i className="smfpIcon smfpIcon-information-analysis" />
                  </div>
                  <span className="title">تحلیل اطلاعات</span>
                </Link>
              </li>
              {currentUser && currentUser.role === 'admin' && (
                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    data-submenu="submenu-3"
                    aria-owns="submenu-3"
                    to={ADMIN}
                  >
                    <div className="icon-wrap">
                      <i className="smfpIcon smfpIcon-admin" />
                    </div>
                    <span className="title">مدیریت</span>
                  </Link>
                </li>
              )}
            </ul>

            <ul
              data-menu="submenu-2"
              id="submenu-2"
              className="menu__level"
              tabIndex="-1"
              role="menu"
              aria-label="تحلیل اطلاعات"
            >
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={ANALYSIS_INTRO}>
                  <span>داشبورد</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ANALYSIS_FACTOR.replace(':type', 'strategic')}
                >
                  <span>تحلیل راهبردی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ANALYSIS_FACTOR.replace(':type', 'economic')}
                >
                  <span>تحلیل اقتصادی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ANALYSIS_FACTOR.replace(':type', 'develop')}
                >
                  <span>تحلیل توسعه پایدار</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ANALYSIS_RELATED_CHART}
                >
                  <span>نمودار وابستگی</span>
                </Link>
              </li>
              {/* <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ANALYSIS_FACTOR.replace(':type', 'environment')}
                >
                  <span>اثرات محیط زیستی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ANALYSIS_FACTOR.replace(':type', 'law_issue')}
                >
                  <span>مسائل قانونی</span>
                </Link>
              </li> */}
            </ul>

            {currentUser && currentUser.role === 'admin' && (
              <ul
                data-menu="submenu-3"
                id="submenu-3"
                className="menu__level"
                tabIndex="-1"
                role="menu"
                aria-label="مدیریت"
              >
                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link className="smfp-menu-link menu__link" to={ADMIN}>
                    <span>داشبورد</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={ELEMENTS_LIST}
                  >
                    <span>مواد معدنی</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={MINERALS_LIST}
                  >
                    <span>کانی ها</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    data-submenu="submenu-3-2"
                    aria-owns="submenu-3-2"
                    to={ELEMENTS_STATS_LIST}
                  >
                    <span>تولید و مصرف</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={GLOBAL_PRICES_LIST}
                  >
                    <span>قیمت جهانی</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={SECONDARY_SOURCES_LIST}
                  >
                    <span>منابع</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link className="smfp-menu-link menu__link" to={MINES_LIST}>
                    <span>معادن</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={INDUSTRY_LIST}
                  >
                    <span>صنایع</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={TECHNOLOGICAL_LEVEL_LIST}
                  >
                    <span>فناوری ها</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={ENVIRONMENT_LIST}
                  >
                    <span>محیط‌زیست</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link className="smfp-menu-link menu__link" to={THREATS_LIST}>
                    <span>تهدیدها</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={INTERNATIONAL_RELATIONS_LIST}
                  >
                    <span>روابط بین الملل</span>
                  </Link>
                </li>

                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    data-submenu="submenu-3-1"
                    aria-owns="submenu-3-1"
                    to={USERS_LIST}
                  >
                    <span>کاربر</span>
                  </Link>
                </li>
              </ul>
            )}

            <ul
              data-menu="submenu-3-1"
              id="submenu-3-1"
              className="menu__level"
              tabIndex="-1"
              role="menu"
              aria-label="کاربر"
            >
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={USER_REGISTER}>
                  <span>افزودن کاربر</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={USERS_LIST}>
                  <span>لیست کاربران</span>
                </Link>
              </li>
              {currentUserId && (
                <li className="smfp-menu-item menu__item" role="menuitem">
                  <Link
                    className="smfp-menu-link menu__link"
                    to={`/admin/user/edit/${currentUserId}`}
                  >
                    <span>پروفایل</span>
                  </Link>
                </li>
              )}
            </ul>

            <ul
              data-menu="submenu-3-2"
              id="submenu-3-2"
              className="menu__level"
              tabIndex="-1"
              role="menu"
              aria-label="تولید و مصرف"
            >
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ELEMENTS_STATS_LIST}
                >
                  <span>تولید و مصرف</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={WORLD_PRODUCTION_LIST}
                >
                  <span>تولید اولیه</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={SECONDARY_PRODUCTION_LIST}
                >
                  <span>تولید ثانویه</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={WORLD_CONSUMPTION_LIST}
                >
                  <span>مصرف</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={EXPORT_LIST}>
                  <span>صادرات از ایران</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={IMPORT_LIST}>
                  <span>واردات به ایران</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location
});

export default connect(mapStateToProps)(withSession(Menu));
