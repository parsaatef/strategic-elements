import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getQualityLevel,
  getCountries
} from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import {
  INTERNATIONAL_RELATION_REGISTER,
  INTERNATIONAL_RELATIONS_LIST,
  INTERNATIONAL_RELATION_EDIT
} from '../../../constants/routes';
import InternationalRelationForm from './form';
import schema from './schema';
import {
  GET_INTERNATIONAL_RELATION,
  UPDATE_INTERNATIONAL_RELATION,
  REGISTER_INTERNATIONAL_RELATION,
  GET_INTERNATIONAL_RELATIONS,
  DELETE_INTERNATIONAL_RELATION,
  MULTI_DELETE_INTERNATIONAL_RELATIONS
} from '../../../queries/internationalRelation';

export default class InternationalRelationManagement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={InternationalRelationForm}
          schema={schema}
          hasElementTab={false}
          registerRoute={INTERNATIONAL_RELATION_REGISTER}
          listRoute={INTERNATIONAL_RELATIONS_LIST}
          editRoute={INTERNATIONAL_RELATION_EDIT.replace('/:id', '')}
          listTitle={
            <FormattedSimpleMsg id="global.internationalRelationsList" />
          }
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-threats"
          query={{
            item: {
              gql: GET_INTERNATIONAL_RELATION,
              func: 'internationalRelation'
            },
            register: {
              gql: REGISTER_INTERNATIONAL_RELATION,
              func: 'registerInternationalRelation'
            },
            update: {
              gql: UPDATE_INTERNATIONAL_RELATION,
              func: 'updateInternationalRelation'
            },
            list: {
              gql: GET_INTERNATIONAL_RELATIONS,
              func: 'searchInternationalRelations',
              items: 'internationalRelations'
            },
            remove: {
              gql: DELETE_INTERNATIONAL_RELATION,
              func: 'removeInternationalRelation'
            },
            multiRemove: {
              gql: MULTI_DELETE_INTERNATIONAL_RELATIONS,
              func: 'multiRemoveInternationalRelations'
            }
          }}
          filters={[
            {
              filter: 'relationLevel',
              label: 'global.relationLevel',
              type: 'select', // text or select
              options: getQualityLevel(),
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
              key: 'country',
              title: <FormattedMessage id="global.country" />,
              item: dbCol => getCountries('option', dbCol.country)
            },
            {
              key: 'relationLevel',
              title: <FormattedMessage id="global.relationLevel" />,
              item: dbCol => getQualityLevel('option', dbCol.relationLevel)
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            country: dbCol => getCountries('option', dbCol.country),
            relationLevel: dbCol =>
              getQualityLevel('option', dbCol.relationLevel),
            moreInfo: dbCol => (
              <div
                dangerouslySetInnerHTML={{
                  __html: dbCol.moreInfo
                }}
              />
            )
          }}
          indexCol="id"
          keyCol="id"
          /* titleCol="country" */
        />
      </div>
    );
  }
}
