import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Counter.css';

export default class Login extends Component<Props> {
  constructor(props) {
    super(props);

    // reset login status

    // this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    // const { username, password } = this.state;
  }

  render() {
    // const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;

    const usernameError = submitted && !username ? ' has-error' : '';

    const passError = submitted && !password ? ' has-error' : '';

    return (
      <div className="smfp-login-page">
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fal fa-arrow-left fa-3x" />
          </Link>
        </div>

        <div className="smfp-login-wrap">
          <div className="smfp-login-wrap-inner">
            <div className="smfp-login-heading animated fadeInUp fast">
              <h1>سامانه مواد معدنی راهبردی (سَمَر)</h1>
            </div>

            <form
              className="animated fadeInUp faster animation-auto-delay delay-1s"
              name="loginform"
              id="loginform"
              action=""
              method="post"
              onSubmit={this.handleSubmit}
            >
              <div
                className={`form-group animated fadeInUp fast animation-auto-delay ${usernameError}`}
              >
                <div className="smfp-input-wrap user-name  animated fadeInUp fast">
                  <input
                    type="text"
                    placeholder="نام کاربری یا ایمیل"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                </div>
                {submitted && !username && (
                  <div className="help-block animated fadeIn fast">
                    Username is required
                  </div>
                )}
              </div>

              <div
                className={`form-group animated fadeInUp fast animation-auto-delay ${passError}`}
              >
                <div className="smfp-input-wrap password  animated fadeInUp fast">
                  <input
                    type="password"
                    placeholder="رمز ورود"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
                {submitted && !password && (
                  <div className="help-block animated fadeIn fast">
                    Password is required
                  </div>
                )}
              </div>

              <div className="form-group animated fadeInUp fast animation-auto-delay">
                <input
                  type="submit"
                  name="smfp-submit"
                  id="smfp-submit"
                  className="submit button button-primary button-large"
                  value="ورود"
                />
              </div>

              <div className="login-other-detail animated fadeInUp fast animation-auto-delay">
                <div className="forgetmenot">
                  <label htmlFor="rememberme" className="checkbox-wrap">
                    <input name="rememberme" type="checkbox" id="rememberme" />{' '}
                    <span className="checkmark" />
                    مرا به خاطر بسپار
                  </label>
                </div>
                <div className="smfp-other">
                  <a href="#" className="signup">
                    ثبت نام
                  </a>
                  <span> / </span>
                  <span className="lostpassword">فراموشی رمز عبور</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
