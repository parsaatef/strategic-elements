import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_SECONDARY_SOURCE,
  UPDATE_SOURCE,
  REGISTER_SOURCE,
  GET_SECONDARY_SOURCES,
  DELETE_SOURCE,
  MULTI_DELETE_SOURCES
} from './query';

export default class SecondarySourceManagement extends Component<Props> {
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
          registerRoute="/admin/secondary-source/register"
          listRoute="/admin/secondary-sources/list"
          editRoute="/admin/secondary-source/edit"
          listTitle={<FormattedSimpleMsg id="global.secondarySourceList" />}
          query={{
            item: {
              gql: GET_SECONDARY_SOURCE,
              func: 'secondarySource'
            },
            register: {
              gql: REGISTER_SOURCE,
              func: 'registerSecondarySource'
            },
            update: {
              gql: UPDATE_SOURCE,
              func: 'updateSecondarySource'
            },
            list: {
              gql: GET_SECONDARY_SOURCES,
              func: 'searchSecondarySource',
              items: 'secondarySources'
            },
            remove: {
              gql: DELETE_SOURCE,
              func: 'removeSecondarySource'
            },
            multiRemove: {
              gql: MULTI_DELETE_SOURCES,
              func: 'multiRemoveSecondarySources'
            }
          }}
          filters={[
            {
              filter: 'title',
              label: <FormattedMessage id="global.title" />,
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'value',
              label: <FormattedMessage id="global.value" />,
              type: 'text', // text or select
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
              key: 'title',
              title: <FormattedMessage id="global.title" />
            },
            {
              key: 'value',
              title: <FormattedMessage id="global.value" />
            },
            {
              key: 'unit',
              title: <FormattedMessage id="global.unit" />
            },
            {
              key: 'description',
              title: <FormattedMessage id="global.description" />
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
          keyCol="title"
          titleCol="title"
        />
      </div>
    );
  }
}
