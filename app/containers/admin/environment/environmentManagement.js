import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
import {
  ENVIRONMENT_REGISTER,
  ENVIRONMENT_LIST,
  ENVIRONMENT_EDIT
} from '../../../constants/routes';
import ElementForm from './form';
import schema from './schema';
import {
  GET_OPTION,
  UPDATE_OPTION,
  REGISTER_OPTION,
  GET_OPTIONS,
  DELETE_OPTION,
  MULTI_DELETE_OPTIONS
} from '../../../queries/option';

export default class EnvironmentManagement extends Component<Props> {
  render() {
    const { match } = this.props;
    console.log('--------this.props-----', this.props);

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={ElementForm}
          schema={schema}
          hasElementTab
          registerRoute={ENVIRONMENT_REGISTER}
          listRoute={ENVIRONMENT_LIST}
          editRoute={ENVIRONMENT_EDIT.replace('/:id', '')}
          listTitle="Environment List"
          query={{
            item: {
              gql: GET_OPTION,
              func: 'option',
              variables: {
                type: 'environment'
              }
            },
            register: {
              gql: REGISTER_OPTION,
              func: 'registerOption',
              variables: {
                type: 'environment'
              }
            },
            update: {
              gql: UPDATE_OPTION,
              func: 'updateOption',
              variables: {
                type: 'environment'
              }
            },
            list: {
              gql: GET_OPTIONS,
              func: 'searchOptions',
              items: 'options',
              variables: {
                type: 'environment'
              }
            },
            remove: {
              gql: DELETE_OPTION,
              func: 'removeOption',
              variables: {
                type: 'environment'
              }
            },
            multiRemove: {
              gql: MULTI_DELETE_OPTIONS,
              func: 'multiRemoveOptions',
              variables: {
                type: 'environment'
              }
            }
          }}
          filters={[
            {
              filter: 'name',
              label: 'Title',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'value',
              label: 'Value',
              type: 'text' // text or select
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'name',
              title: 'Title'
            },
            {
              key: 'value',
              title: 'Value'
            },
            {
              key: 'username',
              title: 'Username'
            },
            {
              key: 'action',
              title: 'Actions'
            }
          ]}
          indexCol="id"
          keyCol="name"
          titleCol="name"
        />
      </div>
    );
  }
}
