import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getPriceUnit,
  getYearOptions
} from '../../../utils/utility';
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
} from '../../../queries/global-price';

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
          listTitle={<FormattedSimpleMsg id="global.globalPriceList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-global-price"
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
              label: 'global.year',
              type: 'select', // text or select
              options: getYearOptions(1990, 2030)
            },
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
              key: 'element',
              title: <FormattedMessage id="global.element" />
            },
            {
              key: 'year',
              title: <FormattedMessage id="global.year" />
            },
            {
              key: 'price',
              title: <FormattedMessage id="global.price" />
            },
            {
              key: 'unit',
              title: <FormattedMessage id="global.unit" />,
              item: dbCol => getPriceUnit('option', dbCol.unit)
            },
            {
              key: 'description',
              title: <FormattedMessage id="global.description" />
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
