import React, { Component } from 'react';

export default class UsersList extends Component<Props> {
  render() {
    return (
      <div>
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
    );
  }
}
