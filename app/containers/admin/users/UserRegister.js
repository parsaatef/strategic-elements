import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../../queries';
import Error from '../../../components/Error';
import styles from '../../../components/Counter.css';
import { HOME } from '../../../constants/routes';

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

class UserRegister extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signUp) => {
    event.preventDefault();
    signUp()
      .then(async ({ data }) => {
        console.log('success', data);
        return data;
      })
      .catch(e => {
        console.error('Error', e);
      });
  };

  validateForm = () => {
    const {
      name,
      username,
      email,
      password,
      passwordConfirmation
    } = this.state;

    return (
      !name ||
      !username ||
      !email ||
      !password ||
      password !== passwordConfirmation
    );
  };

  render() {
    const {
      name,
      username,
      email,
      password,
      passwordConfirmation
    } = this.state;

    return (
      <div className="App">
        <div className={styles.backButton} data-tid="backButton">
          <Link to={HOME}>
            <i className="fal fa-arrow-left fa-3x" />
          </Link>
        </div>
        <br />
        <br />
        <br />
        <h2 className="App">Add New User</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ name, username, email, password }}
        >
          {(signUp, { loading, error }) => (
            <form
              className="form"
              onSubmit={event => this.handleSubmit(event, signUp)}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={this.handleChange}
              />
              <button
                disabled={loading || this.validateForm()}
                type="submit"
                className="button-primary"
              >
                Submit
              </button>

              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(UserRegister);
