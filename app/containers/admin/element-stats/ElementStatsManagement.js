import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
import {
  ELEMENT_STATS_REGISTER,
  ELEMENTS_STATS_LIST,
  ELEMENT_STATS_EDIT
} from '../../../constants/routes';
import ElementForm from './form';
import schema from './schema';
import {
  GET_ELEMENT_STATS,
  UPDATE_ELEMENT_STATS,
  REGISTER_ELEMENT_STATS,
  GET_ELEMENTS_STATS,
  DELETE_ELEMENT_STATS,
  MULTI_DELETE_ELEMENTS_STATS
} from '../../../queries/elementStats';

export default class ExportManagement extends Component<Props> {
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
          registerRoute={ELEMENT_STATS_REGISTER}
          listRoute={ELEMENTS_STATS_LIST}
          editRoute={ELEMENT_STATS_EDIT.replace('/:id', '')}
          listTitle="Elements Stats List"
          query={{
            item: {
              gql: GET_ELEMENT_STATS,
              func: 'elementStats'
            },
            register: {
              gql: REGISTER_ELEMENT_STATS,
              func: 'registerElementStats'
            },
            update: {
              gql: UPDATE_ELEMENT_STATS,
              func: 'updateElementStats'
            },
            list: {
              gql: GET_ELEMENTS_STATS,
              func: 'searchElementStats',
              items: 'elementsStats'
            },
            remove: {
              gql: DELETE_ELEMENT_STATS,
              func: 'removeElementStats'
            },
            multiRemove: {
              gql: MULTI_DELETE_ELEMENTS_STATS,
              func: 'multiRemoveElementStats'
            }
          }}
          filters={[
            {
              filter: 'location',
              label: 'Location',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'year',
              label: 'Year',
              type: 'text' // text or select
            }
          ]}
          columns={[
            {
              key: 'id',
              isCheck: true
            },
            {
              key: 'location',
              title: 'Location'
            },
            {
              key: 'year',
              title: 'Year'
            },
            {
              key: 'exportValue',
              title: 'Export Value'
            },
            {
              key: 'resourceValue',
              title: 'Resource Value'
            },
            {
              key: 'productionValue',
              title: 'Production Value'
            },
            {
              key: 'consumptionValue',
              title: 'Consumption Value'
            },
            {
              key: 'importValue',
              title: 'Import Value'
            },
            {
              key: 'action',
              title: 'Actions'
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
