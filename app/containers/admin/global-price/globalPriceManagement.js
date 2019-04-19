import React, { Component } from 'react';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_GLOBAL_PRICE,
  UPDATE_PRICE,
  REGISTER_PRICE,
  GET_GLOBAL_PRICES,
  DELETE_PRICE,
  MULTI_DELETE_PRICES
} from './query';

export default class GlobalPriceManagement extends Component<Props> {
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
          registerRoute="/admin/global-price/register"
          listRoute="/admin/global-prices/list"
          editRoute="/admin/global-price/edit"
          listTitle="Global Price List"
          query={{
            item: {
              gql: GET_GLOBAL_PRICE,
              func: 'globalPrice'
            },
            register: {
              gql: REGISTER_PRICE,
              func: 'registerPrice'
            },
            update: {
              gql: UPDATE_PRICE,
              func: 'updatePrice'
            },
            list: {
              gql: GET_GLOBAL_PRICES,
              func: 'searchPrice',
              items: 'globalPrices'
            },
            remove: {
              gql: DELETE_PRICE,
              func: 'removePrice'
            },
            multiRemove: {
              gql: MULTI_DELETE_PRICES,
              func: 'multiRemovePrices'
            }
          }}
          filters={[
            {
              filter: 'year',
              label: 'Year',
              type: 'text', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'price',
              label: 'Price',
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
              key: 'year',
              title: 'Year'
            },
            {
              key: 'price',
              title: 'Price'
            },
            {
              key: 'unit',
              title: 'Unit'
            },
            {
              key: 'description',
              title: 'Description'
            },
            {
              key: 'username',
              title: 'Username'
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
