import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_ELEMENT,
  UPDATE_ELEMENT,
  REGISTER_ELEMENT,
  GET_ELEMENTS,
  DELETE_ELEMENT,
  MULTI_DELETE_ELEMENTS
} from '../../../queries/element';

export default class ElementManagement extends Component<Props> {
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
          registerRoute="/admin/element/register"
          listRoute="/admin/elements/list"
          editRoute="/admin/element/edit"
          listTitle={<FormattedSimpleMsg id="global.elementsList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          query={{
            item: {
              gql: GET_ELEMENT,
              func: 'element'
            },
            register: {
              gql: REGISTER_ELEMENT,
              func: 'registerElement'
            },
            update: {
              gql: UPDATE_ELEMENT,
              func: 'updateElement'
            },
            list: {
              gql: GET_ELEMENTS,
              func: 'searchElement',
              items: 'elements'
            },
            remove: {
              gql: DELETE_ELEMENT,
              func: 'removeElement'
            },
            multiRemove: {
              gql: MULTI_DELETE_ELEMENTS,
              func: 'multiRemoveElements'
            }
          }}
          filters={[
            {
              filter: 'elementTitle',
              label: <FormattedMessage id="global.elementTitle" />,
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'group',
              label: <FormattedMessage id="global.group" />,
              type: 'select', // text or select
              options: [
                {
                  label: 'Group1',
                  value: 'group1'
                },
                {
                  label: 'Group2',
                  value: 'group2'
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
              key: 'elementTitle',
              title: <FormattedMessage id="global.elementTitle" />
            },
            {
              key: 'element',
              title: <FormattedMessage id="global.element" />
            },
            {
              key: 'group',
              title: <FormattedMessage id="global.group" />
            },
            {
              key: 'username',
              title: <FormattedMessage id="global.username" />
            },
            {
              key: 'action',
              title: <FormattedSimpleMsg id="global.actions" />
            }
          ]}
          indexCol="id"
          keyCol="element"
          titleCol="elementTitle"
        />
      </div>
    );
  }
}
