import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  email: '',
  password: '',
  submitted: false
};

type Props = {
  history: object,
  refetch: () => void
};

type State = {
  email: string,
  password: string,
  submitted: boolean
};

class Signin extends Component<Props, State> {
  props: Props;

  state = { ...initialState };

  componentDidMount() {
    const { history } = this.props;

    const token = localStorage.getItem('token');

    if (token) {
      history.push('/');
    }
  }

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signIn) => {
    event.preventDefault();

    this.setState({ submitted: true });

    signIn()
      .then(async ({ data }) => {
        localStorage.setItem('token', data.signIn.token);

        const { refetch, history } = this.props;

        await refetch();

        this.clearState();

        history.push('/');

        return data;
      })
      .catch(e => {
        console.error(e);
      });
  };

  validateForm = () => {
    const { email, password } = this.state;
    return !email || !password;
  };

  render() {
    const { email, password, submitted } = this.state;

    const emailError = submitted && !email ? ' has-error' : '';

    const passError = submitted && !password ? ' has-error' : '';

    return (
      <div className="smfp-login-page">
        <div className="smfp-login-wrap">
          <div className="smfp-login-wrap-inner">
            <div className="smfp-login-heading animated fadeInUp fast">
              <h1>سامانه مواد معدنی راهبردی (سَمَر)</h1>
            </div>

            <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
              {(signIn, { loading, error }) => (
                <form
                  name="loginform"
                  id="loginform"
                  action=""
                  method="post"
                  onSubmit={event => this.handleSubmit(event, signIn)}
                >
                  <div
                    className={`form-group animated fadeInUp fast animation-auto-delay ${emailError}`}
                  >
                    <div className="smfp-input-wrap user-name">
                      <input
                        type="text"
                        placeholder="ایمیل"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                    {submitted && !email && (
                      <div className="help-block animated fadeIn fast">
                        Username is required
                      </div>
                    )}
                  </div>
                  <div
                    className={`form-group animated fadeInUp fast animation-auto-delay ${passError}`}
                  >
                    <div className="smfp-input-wrap password">
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
                      disabled={loading || this.validateForm()}
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
                        <input
                          name="rememberme"
                          type="checkbox"
                          id="rememberme"
                        />{' '}
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

                  {error && <Error error={error} />}
                </form>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
