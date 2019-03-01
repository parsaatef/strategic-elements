// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import Menu from './Menu/Menu';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container">
        <div className="smfp-main-page">
          <div className="row">
            <div className="col-sm-3">
              <Menu />
            </div>

            <div className="col-sm-9">
              <div className="smfp-main-container smfp-Custom-scrollbar-container">
                <div className="smfp-main-container-inner">
                  <div className={styles.container} data-tid="container">
                    <h2>HOME PAGE</h2>
                    <Link to={routes.COUNTER}>to Counter</Link>
                    <br />
                    <Link to={routes.LOGIN}>to Login</Link>
                    <br />
                    <Link to={routes.SIGNUP}>to signup</Link>
                    <br />
                    <Link to={routes.ADDNEWELEMENT}>to ADDNEWELEMENT</Link>
                    <br />
                    <Link to={routes.ADDNEWELEMENTFCS}>
                      to AddNewElementFCS
                    </Link>
                    <br />
                    <Link to={routes.ELEMENTDETAILFORWORLD}>
                      to ELEMENTDETAILFORWORLD
                    </Link>
                    <br />
                    <Link to={routes.INFORMATIONOFELEMENT}>
                      to INFORMATIONOFELEMENT
                    </Link>
                    <br />
                    <Link to={routes.INFORMATIONOFIRAN}>
                      to INFORMATIONOFIRAN
                    </Link>
                    <br />
                    <Link to={routes.INFORMATIONOFWORLD}>
                      to INFORMATIONOFWORLD
                    </Link>
                    <br />
                    <Link to={routes.ADDNEWUSER}>to ADDNEWUSER</Link>
                    <br />
                    <Link to={routes.USERSLIST}>to USERSLIST</Link>
                    <br />
                    <Link to={routes.PROFILE}>to PROFILE</Link>
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
