import React, { Component } from 'react';
import Menu from '../Menu/Menu';

export default class Profile extends Component<Props> {
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
                  <h4 className="your-profile-heading">Profile</h4>

                  <form id="your-profile" method="post">
                    <table className="smfp-form-table">
                      <tbody>
                        <tr className="user-user-login-wrap">
                          <th>
                            <div className="user_login">
                              Username (Usernames cannot be changed.)
                            </div>
                          </th>
                          <td>
                            <input
                              type="text"
                              name="user_login"
                              id="user_login"
                              value="admin"
                              disabled="disabled"
                              className="regular-text"
                            />
                          </td>
                        </tr>

                        <tr className="user-first-name-wrap">
                          <th>
                            <div className="first_name">First Name</div>
                          </th>
                          <td>
                            <input
                              type="text"
                              name="first_name"
                              id="first_name"
                            />
                          </td>
                        </tr>

                        <tr className="user-last-name-wrap">
                          <th>
                            <div className="last_name">Last Name</div>
                          </th>
                          <td>
                            <input
                              type="text"
                              name="last_name"
                              id="last_name"
                            />
                          </td>
                        </tr>

                        <tr className="user-email-wrap">
                          <th>
                            <div className="email">
                              Email{' '}
                              <span className="description">(required)</span>
                            </div>
                          </th>
                          <td>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value="fahimezarghani@gmail.com"
                            />
                          </td>
                        </tr>

                        <tr className="user-password-wrap">
                          <th>
                            <div className="pass2"> New Password </div>
                          </th>
                          <td>
                            <input name="pass1" type="password" id="pass1" />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="submit">
                      <input
                        type="submit"
                        name="changeprofile"
                        id="changeprofile"
                        className="btn btn-primary"
                        value="Update Profile"
                      />
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
