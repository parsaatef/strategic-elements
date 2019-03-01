import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import logo from '../../images/logo.jpg';
/*
import '../../assets/js/MultiLevelMenu/modernizr-custom';
import '../../assets/js/MultiLevelMenu/classie';
import '../../assets/js/MultiLevelMenu/main';
import '../../assets/js/MultiLevelMenu/menu';
*/
import '../../assets/css/MultiLevelMenu/component.css';

export default class Menu extends Component<Props> {
  render() {
    return (
      <div className="smfp-header-wrap">
        <header className="smfp-header">
          <div className="smfp-logo">
            <img src={logo} className="smfp-App-logo" alt="logo" />
          </div>
        </header>

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
                  to={routes.INFORMATIONOFWORLD}
                >
                  <img src="../../images/menu-item-1.jpg" alt="img" />
                  <span className="title">منابع و ذخایر</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  data-submenu="submenu-2"
                  aria-owns="submenu-2"
                  to={routes.HOME}
                >
                  <img src="../../images/menu-item-3.jpg" alt="img" />
                  <span className="title">تحلیل اطلاعات</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  data-submenu="submenu-3"
                  aria-owns="submenu-3"
                  to={routes.PROFILE}
                >
                  <img src="../../images/menu-item-4.jpg" alt="img" />
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
                <Link className="smfp-menu-link menu__link" to={routes.HOME}>
                  <span>اقتصادی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={routes.HOME}>
                  <span>راهبردی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={routes.HOME}>
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
                  to={routes.ADDNEWUSER}
                >
                  <span>مدیریت کاربر</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  data-submenu="submenu-3-2"
                  aria-owns="submenu-3-2"
                  to={routes.ADDNEWELEMENT}
                >
                  <span>مدیریت ماده معدنی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={routes.HOME}>
                  <span>مدیریت اطلاعات</span>
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
                <Link
                  className="smfp-menu-link menu__link"
                  to={routes.ADDNEWUSER}
                >
                  <span>افزودن کاربر</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={routes.USERSLIST}
                >
                  <span>لیست کاربران</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={routes.PROFILE}>
                  <span>پروفایل</span>
                </Link>
              </li>
            </ul>

            <ul
              data-menu="submenu-3-2"
              id="submenu-3-2"
              className="menu__level"
              tabIndex="-1"
              role="menu"
              aria-label="مدیریت ماده معدنی"
            >
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={routes.ADDNEWELEMENT}
                >
                  <span>افزودن ماده معدنی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link
                  className="smfp-menu-link menu__link"
                  to={routes.ADDNEWELEMENTFCS}
                >
                  <span>افزودن اطلاعات ماده معدنی کشورها</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={routes.HOME}>
                  <span>صنایع پایین دستی</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={routes.HOME}>
                  <span>منابع ثانویه</span>
                </Link>
              </li>
              <li className="smfp-menu-item menu__item" role="menuitem">
                <Link className="smfp-menu-link menu__link" to={routes.HOME}>
                  <span>محیط زیستی</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
