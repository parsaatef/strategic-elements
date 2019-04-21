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
} from './query';

export default class ElementManagement extends Component<Props> {
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
          registerRoute="/admin/element/register"
          listRoute="/admin/elements/list"
          editRoute="/admin/element/edit"
          listTitle="Element List"
          editTitle="Element Edit"
          registerTitle="Add New User"
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
              label: 'Element Title',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'phaseAtSTP',
              label: 'Phase At STP',
              type: 'select', // text or select
              options: [
                {
                  label: 'Soil',
                  value: 'soil'
                },
                {
                  label: 'Boil',
                  value: 'boil'
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
