import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
import {
  UPSTREAM_INDUSTRY_REGISTER,
  UPSTREAM_INDUSTRY_LIST,
  UPSTREAM_INDUSTRY_EDIT
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

export default class UpstreamIndustryManagement extends Component<Props> {
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
          registerRoute={UPSTREAM_INDUSTRY_REGISTER}
          listRoute={UPSTREAM_INDUSTRY_LIST}
          editRoute={UPSTREAM_INDUSTRY_EDIT.replace('/:id', '')}
          listTitle="Upstream Industry List"
          query={{
            item: {
              gql: GET_OPTION,
              func: 'option',
              variables: {
                type: 'upstream-Industry'
              }
            },
            register: {
              gql: REGISTER_OPTION,
              func: 'registerOption',
              variables: {
                type: 'upstream-Industry'
              }
            },
            update: {
              gql: UPDATE_OPTION,
              func: 'updateOption',
              variables: {
                type: 'upstream-Industry'
              }
            },
            list: {
              gql: GET_OPTIONS,
              func: 'searchOptions',
              items: 'options',
              variables: {
                type: 'upstream-Industry'
              }
            },
            remove: {
              gql: DELETE_OPTION,
              func: 'removeOption',
              variables: {
                type: 'upstream-Industry'
              }
            },
            multiRemove: {
              gql: MULTI_DELETE_OPTIONS,
              func: 'multiRemoveOptions',
              variables: {
                type: 'upstream-Industry'
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
              label: 'Priority',
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
