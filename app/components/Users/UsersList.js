import React, { Component } from 'react';
import Menu from '../Menu/Menu';

export default class UsersList extends Component<Props> {
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
                  <h4 className="users-list-heading">Users List</h4>

                  <table className="smfp-list-table users table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <span>Username</span>
                        </th>
                        <th>
                          <span>Name</span>
                        </th>
                        <th>
                          <span>Email</span>
                        </th>
                        <th>
                          <span>Role</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <span>admin</span>
                        </td>
                        <td>
                          <span>-</span>
                        </td>
                        <td>
                          <span>fahimezarghani@gmail.com</span>
                        </td>
                        <td>
                          <span>Administrator</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>admin</span>
                        </td>
                        <td>
                          <span>-</span>
                        </td>
                        <td>
                          <span>fahimezarghani@gmail.com</span>
                        </td>
                        <td>
                          <span>Administrator</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>admin</span>
                        </td>
                        <td>
                          <span>-</span>
                        </td>
                        <td>
                          <span>fahimezarghani@gmail.com</span>
                        </td>
                        <td>
                          <span>Administrator</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
