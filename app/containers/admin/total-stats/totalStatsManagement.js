import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_TOTAL_STATS,
  UPDATE_TOTAL_STATS,
  REGISTER_TOTAL_STATS,
  GET_TOTAL_STATS_LIST,
  DELETE_TOTAL_STATS,
  MULTI_DELETE_TOTAL_STATS
} from './query';

export default class TotalStatsManagement extends Component<Props> {
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
          registerRoute="/admin/total-stats/register"
          listRoute="/admin/total-stats/list"
          editRoute="/admin/total-stats/edit"
          listTitle={<FormattedSimpleMsg id="global.totalStatsList" />}
          query={{
            item: {
              gql: GET_TOTAL_STATS,
              func: 'totalStats'
            },
            register: {
              gql: REGISTER_TOTAL_STATS,
              func: 'registerTotalStats'
            },
            update: {
              gql: UPDATE_TOTAL_STATS,
              func: 'updateTotalStats'
            },
            list: {
              gql: GET_TOTAL_STATS_LIST,
              func: 'searchTotalStats',
              items: 'totalStatsList'
            },
            remove: {
              gql: DELETE_TOTAL_STATS,
              func: 'removeTotalStats'
            },
            multiRemove: {
              gql: MULTI_DELETE_TOTAL_STATS,
              func: 'multiRemoveTotalStats'
            }
          }}
          filters={[
            {
              filter: 'name',
              label: <FormattedMessage id="global.title" />,
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'year',
              label: <FormattedMessage id="global.year" />,
              type: 'text' // text or select
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
              key: 'year',
              title: <FormattedMessage id="global.year" />
            },
            {
              key: 'value',
              title: <FormattedMessage id="global.value" />
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
