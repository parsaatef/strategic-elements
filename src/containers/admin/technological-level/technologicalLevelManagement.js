import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getQualityLevel } from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import {
  TECHNOLOGICAL_LEVEL_REGISTER,
  TECHNOLOGICAL_LEVEL_LIST,
  TECHNOLOGICAL_LEVEL_EDIT
} from '../../../constants/routes';
import MineralForm from './form';
import schema from './schema';
import {
  GET_TECHNOLOGY,
  GET_TECHNOLOGIES,
  REGISTER_TECHNOLOGY,
  UPDATE_TECHNOLOGY,
  DELETE_TECHNOLOGY,
  MULTI_DELETE_TECHNOLOGIES
} from '../../../queries/technology';

export default class TechnologicalLevelManagement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { id = 0 } = match.params;

    return (
      <div>
        <Page
          id={id}
          form={MineralForm}
          schema={schema}
          hasElementTab={false}
          registerRoute={TECHNOLOGICAL_LEVEL_REGISTER}
          listRoute={TECHNOLOGICAL_LEVEL_LIST}
          editRoute={TECHNOLOGICAL_LEVEL_EDIT.replace('/:id', '')}
          listTitle={<FormattedSimpleMsg id="global.technologicalLevelList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-technological-level"
          query={{
            item: {
              gql: GET_TECHNOLOGY,
              func: 'technology'
            },
            register: {
              gql: REGISTER_TECHNOLOGY,
              func: 'registerTechnology'
            },
            update: {
              gql: UPDATE_TECHNOLOGY,
              func: 'updateTechnology'
            },
            list: {
              gql: GET_TECHNOLOGIES,
              func: 'searchTechnologies',
              items: 'technologies'
            },
            remove: {
              gql: DELETE_TECHNOLOGY,
              func: 'removeTechnology'
            },
            multiRemove: {
              gql: MULTI_DELETE_TECHNOLOGIES,
              func: 'multiRemoveTechnologies'
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
              filter: 'level',
              label: 'global.level',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'strategicImportance',
              label: 'global.strategicImportance',
              type: 'select', // text or select
              options: getQualityLevel()
            },
            {
              filter: 'availabilityInIran',
              label: 'global.availabilityInIran',
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
              title: <FormattedMessage id="global.technology" />
            },
            {
              key: 'level',
              title: <FormattedMessage id="global.level" />,
              item: dbCol => getQualityLevel('option', dbCol.level)
            },
            {
              key: 'strategicImportance',
              title: <FormattedMessage id="global.strategicImportance" />,
              item: dbCol =>
                getQualityLevel('option', dbCol.strategicImportance)
            },
            {
              key: 'availabilityInIran',
              title: <FormattedMessage id="global.availabilityInIran" />,
              item: dbCol => getQualityLevel('option', dbCol.availabilityInIran)
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            level: dbCol => getQualityLevel('option', dbCol.level),
            strategicImportance: dbCol =>
              getQualityLevel('option', dbCol.strategicImportance),
            availabilityInIran: dbCol =>
              getQualityLevel('option', dbCol.availabilityInIran),
            description: dbCol => (
              <div
                dangerouslySetInnerHTML={{
                  __html: dbCol.description
                }}
              />
            )
          }}
          itemsDetailLabels={{
            title: <FormattedMessage id="global.technology" />
          }}
          indexCol="id"
          keyCol="id"
          titleCol="title"
        />
      </div>
    );
  }
}
