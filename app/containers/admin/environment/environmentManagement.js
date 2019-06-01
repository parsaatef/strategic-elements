import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getQualityLevel } from '../../../utils/utility';
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

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={ElementForm}
          schema={schema}
          hasElementTab={false}
          registerRoute={ENVIRONMENT_REGISTER}
          listRoute={ENVIRONMENT_LIST}
          editRoute={ENVIRONMENT_EDIT.replace('/:id', '')}
          listTitle={<FormattedSimpleMsg id="global.environmentList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-environment"
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
              label: 'global.title',
              type: 'text' // text or select
            },
            {
              filter: 'value',
              label: 'global.problem',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'element',
              label: 'global.element',
              type: 'element', // text or select
              isDefault: true,
              default: ''
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'name',
              title: <FormattedMessage id="global.title" />
            },
            {
              key: 'element',
              title: <FormattedMessage id="global.element" />
            },
            {
              key: 'value',
              title: <FormattedMessage id="global.problem" />,
              item: dbCol => getQualityLevel('option', dbCol.value)
            },
            {
              key: 'username',
              title: <FormattedMessage id="global.username" />
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
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
