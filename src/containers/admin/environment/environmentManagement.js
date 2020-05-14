import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getQualityLevel } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import {
  ENVIRONMENT_REGISTER,
  ENVIRONMENT_LIST,
  ENVIRONMENT_EDIT
} from '../../../constants/routes';
import EnvironmentForm from './form';
import schema from './schema';
import {
  GET_ENVIRONMENT,
  UPDATE_ENVIRONMENT,
  REGISTER_ENVIRONMENT,
  GET_ENVIRONMENTS,
  DELETE_ENVIRONMENT,
  MULTI_DELETE_ENVIRONMENTS
} from '../../../queries/environment';

export default class EnvironmentManagement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={EnvironmentForm}
          schema={schema}
          hasElementTab={false}
          registerRoute={ENVIRONMENT_REGISTER}
          listRoute={ENVIRONMENT_LIST}
          editRoute={ENVIRONMENT_EDIT.replace('/:id', '')}
          listTitle={<FormattedSimpleMsg id="global.environmentList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-environment"
          query={{
            item: {
              gql: GET_ENVIRONMENT,
              func: 'environment'
            },
            register: {
              gql: REGISTER_ENVIRONMENT,
              func: 'registerEnvironment'
            },
            update: {
              gql: UPDATE_ENVIRONMENT,
              func: 'updateEnvironment'
            },
            list: {
              gql: GET_ENVIRONMENTS,
              func: 'searchEnvironments',
              items: 'environments'
            },
            remove: {
              gql: DELETE_ENVIRONMENT,
              func: 'removeEnvironment'
            },
            multiRemove: {
              gql: MULTI_DELETE_ENVIRONMENTS,
              func: 'multiRemoveEnvironments'
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
              filter: 'waterConsumption',
              label: 'global.waterConsumption',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'energyConsumption',
              label: 'global.energyConsumption',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'greenhouseGasEmissions',
              label: 'global.greenhouseGasEmissions',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'risksWasteAWasteWater',
              label: 'global.risksWasteAWasteWater',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'productionProcessRisksHuman',
              label: 'global.productionProcessRisksHuman',
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
              key: 'waterConsumption',
              title: <FormattedMessage id="global.waterConsumption" />,
              item: dbCol => getQualityLevel('option', dbCol.waterConsumption)
            },
            {
              key: 'energyConsumption',
              title: <FormattedMessage id="global.energyConsumption" />,
              item: dbCol => getQualityLevel('option', dbCol.energyConsumption)
            },
            {
              key: 'greenhouseGasEmissions',
              title: <FormattedMessage id="global.greenhouseGasEmissions" />,
              item: dbCol =>
                getQualityLevel('option', dbCol.greenhouseGasEmissions)
            },
            {
              key: 'risksWasteAWasteWater',
              title: <FormattedMessage id="global.risksWasteAWasteWater" />,
              item: dbCol =>
                getQualityLevel('option', dbCol.risksWasteAWasteWater)
            },
            {
              key: 'productionProcessRisksHuman',
              title: (
                <FormattedMessage id="global.productionProcessRisksHuman" />
              ),
              item: dbCol =>
                getQualityLevel('option', dbCol.productionProcessRisksHuman)
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            waterConsumption: dbCol =>
              getQualityLevel('option', dbCol.waterConsumption),
            energyConsumption: dbCol =>
              getQualityLevel('option', dbCol.energyConsumption),
            greenhouseGasEmissions: dbCol =>
              getQualityLevel('option', dbCol.greenhouseGasEmissions),
            risksWasteAWasteWater: dbCol =>
              getQualityLevel('option', dbCol.risksWasteAWasteWater),
            productionProcessRisksHuman: dbCol =>
              getQualityLevel('option', dbCol.productionProcessRisksHuman),
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
