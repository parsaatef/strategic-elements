import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getCountries,
  getStates
} from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_MINE,
  UPDATE_MINE,
  REGISTER_MINE,
  GET_MINES,
  DELETE_MINE,
  MULTI_DELETE_MINES
} from '../../../queries/mine';

export default class MineManagement extends Component<Props> {
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
          registerRoute="/admin/mine/register"
          listRoute="/admin/mines/list"
          editRoute="/admin/mine/edit"
          listTitle={<FormattedSimpleMsg id="global.minesList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-mine"
          query={{
            item: {
              gql: GET_MINE,
              func: 'mine'
            },
            register: {
              gql: REGISTER_MINE,
              func: 'registerMine'
            },
            update: {
              gql: UPDATE_MINE,
              func: 'updateMine'
            },
            list: {
              gql: GET_MINES,
              func: 'searchMine',
              items: 'mines'
            },
            remove: {
              gql: DELETE_MINE,
              func: 'removeMine'
            },
            multiRemove: {
              gql: MULTI_DELETE_MINES,
              func: 'multiRemoveMines'
            }
          }}
          filters={[
            {
              filter: 'title',
              label: 'global.title',
              type: 'text' // text or select
            },
            {
              filter: 'description',
              label: 'global.description',
              type: 'text' // text or select
            },
            /* {
              filter: 'locationType',
              label: 'global.locationType',
              type: 'select', // text or select
              options: getLocationType()
            }, */
            {
              filter: 'elements',
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
              key: 'title',
              title: <FormattedMessage id="global.title" />
            },
            {
              key: 'element',
              title: <FormattedMessage id="global.element" />
            },
            {
              key: 'location',
              title: <FormattedMessage id="global.location" />,
              item: dbCol => {
                const value =
                  dbCol.locationType === 'iran'
                    ? getStates('option', dbCol.location)
                    : getCountries('option', dbCol.location);

                return value ? <FormattedSimpleMsg id={value} /> : '';
              }
            },
            {
              key: 'productionValue',
              title: <FormattedMessage id="global.productionSave" />
            },
            {
              key: 'unit',
              title: <FormattedMessage id="global.unit" />,
              isUnit: true
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
