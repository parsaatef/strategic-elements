import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getQualityLevel } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import {
  THREAT_REGISTER,
  THREATS_LIST,
  THREAT_EDIT
} from '../../../constants/routes';
import ThreatForm from './form';
import schema from './schema';
import {
  GET_THREAT,
  UPDATE_THREAT,
  REGISTER_THREAT,
  GET_THREATS,
  DELETE_THREAT,
  MULTI_DELETE_THREATS
} from '../../../queries/threat';

export default class ThreatManagement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={ThreatForm}
          schema={schema}
          hasElementTab={false}
          registerRoute={THREAT_REGISTER}
          listRoute={THREATS_LIST}
          editRoute={THREAT_EDIT.replace('/:id', '')}
          listTitle={<FormattedSimpleMsg id="global.threatsList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-threats"
          query={{
            item: {
              gql: GET_THREAT,
              func: 'threat'
            },
            register: {
              gql: REGISTER_THREAT,
              func: 'registerThreat'
            },
            update: {
              gql: UPDATE_THREAT,
              func: 'updateThreat'
            },
            list: {
              gql: GET_THREATS,
              func: 'searchThreats',
              items: 'threats'
            },
            remove: {
              gql: DELETE_THREAT,
              func: 'removeThreat'
            },
            multiRemove: {
              gql: MULTI_DELETE_THREATS,
              func: 'multiRemoveThreats'
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
              filter: 'effectivenessSanctions',
              label: 'global.effectivenessSanctions',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'impactTariffs',
              label: 'global.impactTariffs',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'levelGovernmentalSupport',
              label: 'global.levelGovernmentalSupport',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'diffRawMaterialValueAProcessedProduct',
              label: 'global.diffRawMaterialValueAProcessedProduct',
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
              key: 'effectivenessSanctions',
              title: <FormattedMessage id="global.effectivenessSanctions" />,
              item: dbCol =>
                getQualityLevel('option', dbCol.effectivenessSanctions)
            },
            {
              key: 'impactTariffs',
              title: <FormattedMessage id="global.impactTariffs" />,
              item: dbCol => getQualityLevel('option', dbCol.impactTariffs)
            },
            {
              key: 'levelGovernmentalSupport',
              title: <FormattedMessage id="global.levelGovernmentalSupport" />,
              item: dbCol =>
                getQualityLevel('option', dbCol.levelGovernmentalSupport)
            },
            {
              key: 'diffRawMaterialValueAProcessedProduct',
              title: (
                <FormattedMessage id="global.diffRawMaterialValueAProcessedProduct" />
              ),
              item: dbCol =>
                getQualityLevel(
                  'option',
                  dbCol.diffRawMaterialValueAProcessedProduct
                )
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            effectivenessSanctions: dbCol =>
              getQualityLevel('option', dbCol.effectivenessSanctions),
            impactTariffs: dbCol =>
              getQualityLevel('option', dbCol.impactTariffs),
            levelGovernmentalSupport: dbCol =>
              getQualityLevel('option', dbCol.levelGovernmentalSupport),
            diffRawMaterialValueAProcessedProduct: dbCol =>
              getQualityLevel(
                'option',
                dbCol.diffRawMaterialValueAProcessedProduct
              ),
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
          titleCol="element"
        />
      </div>
    );
  }
}
