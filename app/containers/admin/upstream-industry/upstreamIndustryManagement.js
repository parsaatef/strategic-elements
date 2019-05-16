import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getQualityLevel } from '../../../utils/utility';
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
          listTitle={<FormattedSimpleMsg id="global.upstreamIndustryList" />}
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
              label: 'global.title',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'value',
              label: 'global.priority',
              type: 'select', // text or select
              options: getQualityLevel()
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
              title: <FormattedMessage id="global.priority" />,
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
