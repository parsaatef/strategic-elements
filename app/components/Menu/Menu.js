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
  TOTAL_STATS_LIST,
  EXPORT_LIST,
  IMPORT_LIST,
  WORLD_RESERVES_LIST,
  IRAN_RESERVES_LIST,
  WORLD_PRODUCTION_LIST,
  IRAN_PRODUCTION_LIST,
  WORLD_CONSUMPTION_LIST,
  IRAN_CONSUMPTION_LIST,
  DEPENDENCE_INDUSTRIES_LIST,
  TECHNOLOGICAL_LEVEL_LIST,
  SECONDARY_PRODUCTION_LIST,
  UPSTREAM_INDUSTRY_LIST,
  THREATS_LIST,
  ENVIRONMENT_LIST,
  INFORMATION_OF_WORLD,
  ADD_NEW_USER,
  USERS_LIST,
  PROFILE,
  ELEMENTS_STATS_LIST
} from '../../constants/routes';
import logo from '../../images/logo.jpg';
import item1 from '../../images/menu-item-1.jpg';
import item3 from '../../images/menu-item-3.jpg';
import item4 from '../../images/menu-item-4.jpg';
import classie from '../../assets/js/MultiLevelMenu/classie';
import MLMenu from '../../assets/js/MultiLevelMenu/main';
import '../../assets/css/MultiLevelMenu/component.css';
// import Signout from '../Auth/Signout';

class Menu extends Component<Props> {
  componentDidMount() {
    const menuEl = document.getElementById('ml-menu');

    const { location } = this.props;

    this.mlMenu = new MLMenu(menuEl, {
      // breadcrumbsCtrl : true, // show breadcrumbs
      // initialBreadcrumb : 'all', // initial breadcrumb text
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
      this.mlMenu.setCurrentMenu(location);
    }
  }

  render() {
    return (
      <div className="smfp-header-wrap">
        <header className="smfp-header">
          <div className="smfp-logo">
            <img src={logo} className="smfp-App-logo" alt="logo" />
          </div>
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
              aria-label="All"
            >
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={INFORMATION_OF_WORLD}
                >
                  <img src={item1} alt="img" />
                  <span className="title">منابع و ذخایر</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  data-submenu="submenu-2"
                  aria-owns="submenu-2"
                  to={HOME}
                >
                  <img src={item3} alt="img" />
                  <span className="title">تحلیل اطلاعات</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  data-submenu="submenu-3"
                  aria-owns="submenu-3"
                  to={PROFILE}
                >
                  <img src={item4} alt="img" />
                  <span className="title">ادمین</span>
                </Link>
              </li>
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
                <Link className="smfp-menu-link menu__link" to={HOME}>
                  <span>اقتصادی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={HOME}>
                  <span>راهبردی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={HOME}>
                  <span>محیط زیستی</span>
                </Link>
              </li>
            </ul>

            <ul
              data-menu="submenu-3"
              id="submenu-3"
              className="menu__level"
              tabIndex="-1"
              role="menu"
              aria-label="ادمین"
            >
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  data-submenu="submenu-3-1"
                  aria-owns="submenu-3-1"
                  to={ADD_NEW_USER}
                >
                  <span>مدیریت کاربر</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={ELEMENTS_LIST}>
                  <span>مدیریت ماده معدنی</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ELEMENTS_STATS_LIST}
                >
                  <span>مدیریت آمار مواد معدنی</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={MINERALS_LIST}>
                  <span>مدیریت کانی ها</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={MINES_LIST}>
                  <span>مدیریت معادن</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={GLOBAL_PRICES_LIST}
                >
                  <span>مدیریت قیمت جهانی</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={SECONDARY_SOURCES_LIST}
                >
                  <span>مدیریت منابع ثانویه</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={TOTAL_STATS_LIST}
                >
                  <span>مدیریت آمار کلی</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={EXPORT_LIST}>
                  <span>مدیریت صادرات</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={IMPORT_LIST}>
                  <span>مدیریت واردات</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={WORLD_RESERVES_LIST}
                >
                  <span>مدیریت منابع جهان</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={IRAN_RESERVES_LIST}
                >
                  <span>مدیریت منابع ایران</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={WORLD_PRODUCTION_LIST}
                >
                  <span>مدیریت تولید جهان</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={IRAN_PRODUCTION_LIST}
                >
                  <span>مدیریت تولید ایران</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={WORLD_CONSUMPTION_LIST}
                >
                  <span>مدیریت مصرف جهان</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={IRAN_CONSUMPTION_LIST}
                >
                  <span>مدیریت مصرف ایران</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={DEPENDENCE_INDUSTRIES_LIST}
                >
                  <span>مدیریت صنایع وابسته</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={TECHNOLOGICAL_LEVEL_LIST}
                >
                  <span>مدیریت سطح تکنولوژی</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={SECONDARY_PRODUCTION_LIST}
                >
                  <span>مدیریت تولید ثانویه</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={UPSTREAM_INDUSTRY_LIST}
                >
                  <span>مدیریت صنایع پایین‌دستی</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={THREATS_LIST}>
                  <span>مدیریت تهدیدات</span>
                </Link>
              </li>

              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={ENVIRONMENT_LIST}
                >
                  <span>مدیریت محیط‌زیست</span>
                </Link>
              </li>
            </ul>

            <ul
              data-menu="submenu-3-1"
              id="submenu-3-1"
              className="menu__level"
              tabIndex="-1"
              role="menu"
              aria-label="مدیریت کاربر"
            >
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={ADD_NEW_USER}>
                  <span>افزودن کاربر</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={USERS_LIST}>
                  <span>لیست کاربران</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={PROFILE}>
                  <span>پروفایل</span>
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

export default connect(mapStateToProps)(Menu);
