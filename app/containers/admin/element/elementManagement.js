import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getMagneticPropertyOptions,
  FormattedSimpleMsg,
  getPhaseAtSTPOptions,
  getElCOptions,
  getElementsCategory,
  getQualityLevel
} from '../../../utils/utility';
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

class ElementManagement extends Component<Props> {
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
          pageIcon="smfpIcon smfpIcon-element"
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
              label: 'global.element',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'category',
              label: 'global.category',
              type: 'select', // text or select
              options: getElementsCategory()
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'elementTitle',
              title: <FormattedMessage id="global.persian_name" />
            },
            {
              key: 'element',
              title: <FormattedMessage id="global.english_name" />
            },
            {
              key: 'symbol',
              title: <FormattedMessage id="global.symbol" />
            },
            {
              key: 'category',
              title: <FormattedMessage id="global.category" />,
              item: dbCol => getElementsCategory('option', dbCol.category)
            },
            {
              key: 'usage1',
              title: <FormattedMessage id="global.usage1" />
            },
            {
              key: 'usage2',
              title: <FormattedMessage id="global.usage2" />
            },
            {
              key: 'usage3',
              title: <FormattedMessage id="global.usage3" />
            },
            {
              key: 'action',
              title: <FormattedSimpleMsg id="global.actions" />
            }
          ]}
          indexCol="id"
          keyCol="element"
          titleCol="elementTitle"
          itemsDetail={{
            category: dbCol => getElementsCategory('option', dbCol.category),
            phaseAtSTP: dbCol =>
              getPhaseAtSTPOptions('option', dbCol.phaseAtSTP),
            electricalConductivity: dbCol =>
              getElCOptions('option', dbCol.electricalConductivity),
            magneticProperty: dbCol =>
              getMagneticPropertyOptions('option', dbCol.magneticProperty),
            toxicity: dbCol => getQualityLevel('option', dbCol.toxicity),
            description: dbCol => (
              <div
                dangerouslySetInnerHTML={{
                  __html: dbCol.description
                }}
              />
            )
          }}
          itemsDetailLabels={{
            elementTitle: <FormattedMessage id="global.persian_name" />,
            element: <FormattedMessage id="global.english_name" />
          }}
        />
      </div>
    );
  }
}

export default ElementManagement;
