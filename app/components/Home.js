// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
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
                </header>

              </div>

            </div>

            <div className="col-sm-9">
              <div className="smfp-main-container smfp-Custom-scrollbar-container">
                <div className="smfp-main-container-inner">

                  <div className={styles.container} data-tid="container">
                    <h2>HOME PAGE</h2>
                    <Link to={routes.COUNTER}>to Counter</Link><br></br>
                    <Link to={routes.LOGIN}>to Login</Link>
                    <h3>سامانه فناورانه پویا</h3>
                    <i className="fa fa-edit"></i>
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
