import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getQualityLevel } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import {
  DEPENDENCE_INDUSTRIES_REGISTER,
  DEPENDENCE_INDUSTRIES_LIST,
  DEPENDENCE_INDUSTRIES_EDIT
} from '../../../constants/routes';
import DependenceIndustriesForm from './form';
import schema from './schema';
import {
  GET_OPTION,
  UPDATE_OPTION,
  REGISTER_OPTION,
  GET_OPTIONS,
  DELETE_OPTION,
  MULTI_DELETE_OPTIONS
} from '../../../queries/option';

export default class DependenceIndustriesManagement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={DependenceIndustriesForm}
          schema={schema}
          hasElementTab={false}
          registerRoute={DEPENDENCE_INDUSTRIES_REGISTER}
          listRoute={DEPENDENCE_INDUSTRIES_LIST}
          editRoute={DEPENDENCE_INDUSTRIES_EDIT.replace('/:id', '')}
          listTitle={
            <FormattedSimpleMsg id="global.dependenceIndustriesList" />
          }
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-dependence-industries"
          query={{
            item: {
              gql: GET_OPTION,
              func: 'option',
              variables: {
                type: 'dependence-industries'
              }
            },
            register: {
              gql: REGISTER_OPTION,
              func: 'registerOption',
              variables: {
                type: 'dependence-industries'
              }
            },
            update: {
              gql: UPDATE_OPTION,
              func: 'updateOption',
              variables: {
                type: 'dependence-industries'
              }
            },
            list: {
              gql: GET_OPTIONS,
              func: 'searchOptions',
              items: 'options',
              variables: {
                type: 'dependence-industries'
              }
            },
            remove: {
              gql: DELETE_OPTION,
              func: 'removeOption',
              variables: {
                type: 'dependence-industries'
              }
            },
            multiRemove: {
              gql: MULTI_DELETE_OPTIONS,
              func: 'multiRemoveOptions',
              variables: {
                type: 'dependence-industries'
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
              label: 'global.dependentLevel',
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
              title: <FormattedMessage id="global.dependentLevel" />,
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
