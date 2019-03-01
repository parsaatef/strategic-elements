import React, { Component } from 'react';
import Menu from '../Menu/Menu';

export default class AddNewUser extends Component<Props> {
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
                  <h4 id="add-new-user">Add New User</h4>
                  <p>Create a brand new user and add them to this site.</p>

                  <form>
                    <table className="smfp-form-table">
                      <tbody>
                        <tr className="form-field form-required">
                          <th scope="row">
                            <div className="user_login">
                              Username{' '}
                              <span className="description">(required)</span>
                            </div>
                          </th>
                          <td>
                            <input
                              name="user_login"
                              type="text"
                              id="user_login"
                            />
                          </td>
                        </tr>
                        <tr className="form-field form-required">
                          <th scope="row">
                            <div className="email">
                              Email{' '}
                              <span className="description">(required)</span>
                            </div>
                          </th>
                          <td>
                            <input name="email" type="email" id="email" />
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="first_name">First Name </div>
                          </th>
                          <td>
                            <input
                              name="first_name"
                              type="text"
                              id="first_name"
                            />
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="last_name">Last Name </div>
                          </th>
                          <td>
                            <input
                              name="last_name"
                              type="text"
                              id="last_name"
                            />
                          </td>
                        </tr>
                        <tr className="form-field form-required user-pass1-wrap">
                          <th scope="row">
                            <div className="pass2">
                              Password{' '}
                              <span className="description">(required)</span>
                            </div>
                          </th>
                          <td>
                            <input name="pass1" type="password" id="pass1" />
                          </td>
                        </tr>
                        <tr className="form-field form-required user-pass2-wrap">
                          <th scope="row">
                            <div className="pass2">
                              Repeat Password{' '}
                              <span className="description">(required)</span>
                            </div>
                          </th>
                          <td>
                            <input name="pass2" type="password" id="pass2" />
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="role">Role</div>
                          </th>
                          <td>
                            <select name="role" id="role">
                              <option selected="selected" value="subscriber">
                                Subscriber
                              </option>
                              <option value="contributor">Contributor</option>
                              <option value="author">Author</option>
                              <option value="editor">Editor</option>
                              <option value="administrator">
                                Administrator
                              </option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="submit">
                      <input
                        type="submit"
                        name="createuser"
                        id="createuser"
                        className="btn btn-primary"
                        value="Add New User"
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
