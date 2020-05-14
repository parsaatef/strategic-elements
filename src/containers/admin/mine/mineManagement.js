import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getCountries,
  getStates,
  getMineStatus,
  getQualityLevel,
  getLocationType,
  getUnit
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
              func: 'registerMine',
              variables: {
                locationType: 'iran'
              }
            },
            update: {
              gql: UPDATE_MINE,
              func: 'updateMine',
              variables: {
                locationType: 'iran'
              }
            },
            list: {
              gql: GET_MINES,
              func: 'searchMine',
              items: 'mines',
              variables: {
                locationType: 'iran'
              }
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
              filter: 'location',
              label: 'global.state',
              type: 'select', // text or select
              options: getMineStatus()
            }
            /* {
              filter: 'mineral',
              label: 'global.mineral',
              type: 'text' // text or select
            }, */
            /* {
              filter: 'locationType',
              label: 'global.locationType',
              type: 'select', // text or select
              options: getLocationType()
            }, */
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },

            {
              key: 'title',
              title: <FormattedMessage id="global.mine_name" />
            },
            {
              key: 'location',
              title: <FormattedMessage id="global.state" />,
              item: dbCol => {
                const value =
                  dbCol.locationType === 'iran'
                    ? getStates('option', dbCol.location)
                    : getCountries('option', dbCol.location);

                return value && dbCol.locationType === 'iran' ? (
                  <FormattedSimpleMsg id={value} />
                ) : (
                  value
                );
              }
            },
            {
              key: 'element',
              title: <FormattedMessage id="global.element" />
            },
            {
              key: 'mineral',
              title: <FormattedMessage id="global.main_mineral" />
            },
            {
              key: 'caratAverage',
              title: <FormattedMessage id="global.caratAverage" />
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
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            location: dbCol => {
              const value =
                dbCol.locationType === 'iran'
                  ? getStates('option', dbCol.location)
                  : getCountries('option', dbCol.location);

              return value && dbCol.locationType === 'iran' ? (
                <FormattedSimpleMsg id={value} />
              ) : (
                value
              );
            },
            locationType: dbCol =>
              getLocationType('option', dbCol.locationType),
            unit: dbCol => getUnit('option', dbCol.unit),
            status: dbCol => getMineStatus('option', dbCol.status),
            impactPreventLocalDeprivation: dbCol =>
              getQualityLevel('option', dbCol.impactPreventLocalDeprivation),
            description: dbCol => (
              <div
                dangerouslySetInnerHTML={{
                  __html: dbCol.description
                }}
              />
            )
          }}
          itemsDetailLabels={{
            location: <FormattedMessage id="global.state" />,
            locationType: <FormattedMessage id="global.country" />
          }}
          indexCol="id"
          keyCol="id"
          titleCol="title"
        />
      </div>
    );
  }
}
