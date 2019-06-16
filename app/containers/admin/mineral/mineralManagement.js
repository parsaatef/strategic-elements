import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getQualityLevel } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_MINERAL,
  UPDATE_MINERAL,
  REGISTER_MINERAL,
  GET_MINERALS,
  DELETE_MINERAL,
  MULTI_DELETE_MINERALS
} from '../../../queries/mineral';

export default class MineralManagement extends Component<Props> {
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
          registerRoute="/admin/mineral/register"
          listRoute="/admin/minerals/list"
          editRoute="/admin/mineral/edit"
          listTitle={<FormattedSimpleMsg id="global.mineralList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-mineral"
          query={{
            item: {
              gql: GET_MINERAL,
              func: 'mineral'
            },
            register: {
              gql: REGISTER_MINERAL,
              func: 'registerMineral'
            },
            update: {
              gql: UPDATE_MINERAL,
              func: 'updateMineral'
            },
            list: {
              gql: GET_MINERALS,
              func: 'searchMineral',
              items: 'minerals'
            },
            remove: {
              gql: DELETE_MINERAL,
              func: 'removeMineral'
            },
            multiRemove: {
              gql: MULTI_DELETE_MINERALS,
              func: 'multiRemoveMinerals'
            }
          }}
          filters={[
            {
              filter: 'elements',
              label: 'global.element',
              type: 'element', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'title',
              label: 'global.title',
              type: 'text' // text or select
            },
            {
              filter: 'abundance',
              label: 'global.abundance',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'color',
              label: 'global.color',
              type: 'text' // text or select
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'title',
              title: <FormattedMessage id="global.mineral_persian_name" />
            },
            {
              key: 'alias',
              title: <FormattedMessage id="global.mineral_english_name" />
            },
            {
              key: 'elements',
              title: <FormattedMessage id="global.element" />,
              item: dbCol => dbCol.elements.join(', ')
            },
            {
              key: 'abundance',
              title: <FormattedMessage id="global.abundance" />,
              item: dbCol => getQualityLevel('option', dbCol.abundance)
            },
            {
              key: 'color',
              title: <FormattedMessage id="global.color" />
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            elements: dbCol => dbCol.elements.join(', '),
            abundance: dbCol => getQualityLevel('option', dbCol.abundance),
            moreInfo: dbCol => (
              <div
                dangerouslySetInnerHTML={{
                  __html: dbCol.moreInfo
                }}
              />
            )
          }}
          indexCol="id"
          keyCol="title"
          titleCol="title"
        />
      </div>
    );
  }
}
