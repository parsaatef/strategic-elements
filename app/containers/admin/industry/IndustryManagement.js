import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getQualityLevel,
  getIndustryTypes
} from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import {
  INDUSTRY_REGISTER,
  INDUSTRY_LIST,
  INDUSTRY_EDIT
} from '../../../constants/routes';
import IndustriesForm from './form';
import schema from './schema';
import {
  GET_INDUSTRY,
  GET_INDUSTRIES,
  REGISTER_INDUSTRY,
  UPDATE_INDUSTRY,
  DELETE_INDUSTRY,
  MULTI_DELETE_INDUSTRIES
} from '../../../queries/industry';

export default class IndustryManagement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={IndustriesForm}
          schema={schema}
          hasElementTab={false}
          registerRoute={INDUSTRY_REGISTER}
          listRoute={INDUSTRY_LIST}
          editRoute={INDUSTRY_EDIT.replace('/:id', '')}
          listTitle={<FormattedSimpleMsg id="global.industriesList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-dependence-industries"
          query={{
            item: {
              gql: GET_INDUSTRY,
              func: 'industry'
            },
            register: {
              gql: REGISTER_INDUSTRY,
              func: 'registerIndustry'
            },
            update: {
              gql: UPDATE_INDUSTRY,
              func: 'updateIndustry'
            },
            list: {
              gql: GET_INDUSTRIES,
              func: 'searchIndustries',
              items: 'industries'
            },
            remove: {
              gql: DELETE_INDUSTRY,
              func: 'removeIndustry'
            },
            multiRemove: {
              gql: MULTI_DELETE_INDUSTRIES,
              func: 'multiRemoveIndustries'
            }
          }}
          filters={[
            {
              filter: 'element',
              label: 'global.element',
              type: 'element', // text or select
              isDefault: true,
              default: ''
            },
            {
              filter: 'title',
              label: 'global.industry',
              type: 'text' // text or select
            },
            {
              filter: 'type',
              label: 'global.type',
              type: 'select', // text or select
              options: getIndustryTypes()
            },
            {
              filter: 'strategicImportance',
              label: 'global.strategicImportance',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'economicSignificance',
              label: 'global.economicSignificance',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'jobCreationRate',
              label: 'global.jobCreationRate',
              type: 'select', // text or select
              options: getQualityLevel()
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
              key: 'title',
              title: <FormattedMessage id="global.industry" />
            },
            {
              key: 'type',
              title: <FormattedMessage id="global.type" />,
              item: dbCol => getIndustryTypes('option', dbCol.type)
            },
            {
              key: 'strategicImportance',
              title: <FormattedMessage id="global.strategicImportance" />,
              item: dbCol =>
                getQualityLevel('option', dbCol.strategicImportance)
            },
            {
              key: 'economicSignificance',
              title: <FormattedMessage id="global.economicSignificance" />,
              item: dbCol =>
                getQualityLevel('option', dbCol.economicSignificance)
            },
            {
              key: 'jobCreationRate',
              title: <FormattedMessage id="global.jobCreationRate" />,
              item: dbCol => getQualityLevel('option', dbCol.jobCreationRate)
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            type: dbCol => getIndustryTypes('option', dbCol.type),
            strategicImportance: dbCol =>
              getQualityLevel('option', dbCol.strategicImportance),
            economicSignificance: dbCol =>
              getQualityLevel('option', dbCol.economicSignificance),
            jobCreationRate: dbCol =>
              getQualityLevel('option', dbCol.jobCreationRate),
            moreInfo: dbCol => (
              <div
                dangerouslySetInnerHTML={{
                  __html: dbCol.moreInfo
                }}
              />
            )
          }}
          itemsDetailLabels={{
            title: <FormattedMessage id="global.industryName" />
          }}
          indexCol="id"
          keyCol="id"
          titleCol="title"
        />
      </div>
    );
  }
}
