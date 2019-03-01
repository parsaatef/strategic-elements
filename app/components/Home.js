// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  COUNTER,
  USER_REGISTER,
  ADDNEWELEMENT,
  ADDNEWELEMENTFCS,
  ELEMENTDETAILFORWORLD,
  INFORMATIONOFELEMENT,
  INFORMATIONOFIRAN,
  INFORMATIONOFWORLD,
  ADDNEWUSER,
  USERSLIST,
  PROFILE
} from '../constants/routes';
import Signout from './Auth/Signout';
import styles from './Home.css';
import Menu from './Menu/Menu';
import logo from '../images/logo.jpg';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container">
        <div className="smfp-main-page">
          <div className="row">
            <div className="col-sm-3">
              <div className="smfp-header-wrap">
                <header className="smfp-header">
                  <div className="smfp-logo">
                    <img src={logo} className="smfp-App-logo" alt="logo" />
                  </div>
                  <Signout />
                </header>
              </div>

              <Menu />
            </div>

            <div className="col-sm-9">
              <div className="smfp-main-container smfp-Custom-scrollbar-container">
                <div className="smfp-main-container-inner">
                  <div className={styles.container} data-tid="container">
                    <h2>HOME PAGE</h2>
                    <Link to={COUNTER}>to Counter</Link>
                    <br />
                    <Link to={USER_REGISTER}>to Add User</Link>
                    <br />
                    <Link to={ADDNEWELEMENT}>to ADDNEWELEMENT</Link>
                    <br />
                    <Link to={ADDNEWELEMENTFCS}>to AddNewElementFCS</Link>
                    <br />
                    <Link to={ELEMENTDETAILFORWORLD}>
                      to ELEMENTDETAILFORWORLD
                    </Link>
                    <br />
                    <Link to={INFORMATIONOFELEMENT}>
                      to INFORMATIONOFELEMENT
                    </Link>
                    <br />
                    <Link to={INFORMATIONOFIRAN}>to INFORMATIONOFIRAN</Link>
                    <br />
                    <Link to={INFORMATIONOFWORLD}>to INFORMATIONOFWORLD</Link>
                    <br />
                    <Link to={ADDNEWUSER}>to ADDNEWUSER</Link>
                    <br />
                    <Link to={USERSLIST}>to USERSLIST</Link>
                    <br />
                    <Link to={PROFILE}>to PROFILE</Link>

                    <h3>سامانه فناورانه پویا</h3>
                    <i className="fa fa-edit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
