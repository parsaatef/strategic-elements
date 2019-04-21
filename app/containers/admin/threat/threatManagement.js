import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
import {
  THREAT_REGISTER,
  THREATS_LIST,
  THREAT_EDIT
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

export default class ThreatManagement extends Component<Props> {
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
          hasElementTab={false}
          registerRoute={THREAT_REGISTER}
          listRoute={THREATS_LIST}
          editRoute={THREAT_EDIT.replace('/:id', '')}
          listTitle="Threats List"
          query={{
            item: {
              gql: GET_OPTION,
              func: 'option',
              variables: {
                type: 'threat'
              }
            },
            register: {
              gql: REGISTER_OPTION,
              func: 'registerOption',
              variables: {
                type: 'threat'
              }
            },
            update: {
              gql: UPDATE_OPTION,
              func: 'updateOption',
              variables: {
                type: 'threat'
              }
            },
            list: {
              gql: GET_OPTIONS,
              func: 'searchOptions',
              items: 'options',
              variables: {
                type: 'threat'
              }
            },
            remove: {
              gql: DELETE_OPTION,
              func: 'removeOption',
              variables: {
                type: 'threat'
              }
            },
            multiRemove: {
              gql: MULTI_DELETE_OPTIONS,
              func: 'multiRemoveOptions',
              variables: {
                type: 'threat'
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
              label: 'Level',
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
