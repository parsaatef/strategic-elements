import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getQualityLevel,
  getCountries,
  getUnit
} from '../../../utils/utility';
import Page from '../../../components/list-register/Page';
import ElementForm from './form';
import schema from './schema';
import {
  GET_RESOURCE,
  UPDATE_SOURCE,
  REGISTER_SOURCE,
  GET_RESOURCES,
  DELETE_SOURCE,
  MULTI_DELETE_SOURCES
} from '../../../queries/resource';

export default class ResourceManagement extends Component<Props> {
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
          registerRoute="/admin/secondary-source/register"
          listRoute="/admin/secondary-sources/list"
          editRoute="/admin/secondary-source/edit"
          listTitle={<FormattedSimpleMsg id="global.resourceList" />}
          editTitle={<FormattedSimpleMsg id="global.itemEdit" />}
          registerTitle={<FormattedSimpleMsg id="global.addNew" />}
          pageIcon="smfpIcon smfpIcon-secondary-sources"
          query={{
            item: {
              gql: GET_RESOURCE,
              func: 'resource'
            },
            register: {
              gql: REGISTER_SOURCE,
              func: 'registerResource'
            },
            update: {
              gql: UPDATE_SOURCE,
              func: 'updateResource'
            },
            list: {
              gql: GET_RESOURCES,
              func: 'searchResource',
              items: 'resources'
            },
            remove: {
              gql: DELETE_SOURCE,
              func: 'removeResource'
            },
            multiRemove: {
              gql: MULTI_DELETE_SOURCES,
              func: 'multiRemoveResources'
            }
          }}
          filters={[
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
              key: 'location',
              title: <FormattedMessage id="global.country" />,
              item: dbCol => getCountries('option', dbCol.location)
            },
            {
              key: 'primarySource',
              title: <FormattedMessage id="global.primarySource" />
            },
            {
              key: 'unit',
              title: <FormattedMessage id="global.unit" />,
              isUnit: true
            },
            {
              key: 'secondarySource',
              title: <FormattedMessage id="global.secondarySource" />,
              item: dbCol => getQualityLevel('option', dbCol.secondarySource)
            },
            {
              key: 'action',
              title: <FormattedMessage id="global.actions" />
            }
          ]}
          itemsDetail={{
            location: dbCol => getCountries('option', dbCol.location),
            secondarySource: dbCol =>
              getQualityLevel('option', dbCol.secondarySource),
            unit: dbCol => getUnit('option', dbCol.unit),
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
