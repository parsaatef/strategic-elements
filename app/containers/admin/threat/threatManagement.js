import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
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
          listTitle={<FormattedSimpleMsg id="global.threatsList" />}
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
              label: <FormattedSimpleMsg id="global.title" />,
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'value',
              label: <FormattedSimpleMsg id="global.level" />,
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
              key: 'name',
              title: <FormattedMessage id="global.title" />
            },
            {
              key: 'value',
              title: <FormattedMessage id="global.level" />
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
