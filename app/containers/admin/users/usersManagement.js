import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import UserForm from './form';
import schema from './schema';
import {
  GET_USER,
  GET_USERS,
  SIGNUP_USER,
  UPDATE_USER,
  DELETE_USER,
  MULTI_DELETE_USER
} from '../../../queries/index';

export default class ElementManagement extends Component<Props> {
  render() {
    const { match } = this.props;
    console.log('--------this.props-----', this.props);

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={UserForm}
          schema={schema}
          hasElementTab={false}
          registerRoute="/admin/user/register"
          listRoute="/admin/users/list"
          editRoute="/admin/user/edit"
          listTitle={<FormattedSimpleMsg id="global.usersList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          query={{
            item: {
              gql: GET_USER,
              func: 'user'
            },
            register: {
              gql: SIGNUP_USER,
              func: 'signUp'
            },
            update: {
              gql: UPDATE_USER,
              func: 'updateUser'
            },
            list: {
              gql: GET_USERS,
              func: 'searchUser',
              items: 'users'
            },
            remove: {
              gql: DELETE_USER,
              func: 'removeUser'
            },
            multiRemove: {
              gql: MULTI_DELETE_USER,
              func: 'multiRemoveUsers'
            }
          }}
          filters={[
            {
              filter: 'username',
              label: <FormattedMessage id="global.username" />,
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'name',
              label: <FormattedMessage id="global.name" />,
              type: 'text' // text or select
            },
            {
              filter: 'email',
              label: <FormattedMessage id="global.email" />,
              type: 'text' // text or select
            },
            {
              filter: 'role',
              label: <FormattedMessage id="global.role" />,
              type: 'select', // text or select
              options: [
                {
                  label: 'Admin',
                  value: 'admin'
                },
                {
                  label: 'User',
                  value: 'user'
                }
              ]
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'username',
              title: <FormattedMessage id="global.username" />
            },
            {
              key: 'name',
              title: <FormattedMessage id="global.name" />
            },
            {
              key: 'email',
              title: <FormattedMessage id="global.email" />
            },
            {
              key: 'role',
              title: <FormattedMessage id="global.role" />
            },
            {
              key: 'action',
              title: <FormattedSimpleMsg id="global.actions" />
            }
          ]}
          indexCol="id"
          keyCol="username"
          titleCol="name"
        />
      </div>
    );
  }
}
