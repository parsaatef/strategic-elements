// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from '../components/Counter.css';

type Props = {};

export default class SignupPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="smfp-login-page">
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        test..............
      </div>
    );
  }
}
