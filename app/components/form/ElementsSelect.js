import React from 'react';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import ReactSelect from 'react-select';
import _ from 'underscore';
import Field from './Field';
import { GET_ELEMENTS } from '../../queries/element';
import { FormattedSimpleMsg } from '../../utils/utility';
import Loading from '../General/Loading';

const getSelectValue = (value, options) => _.findWhere(options, { value });

const ElementsSelect = ({ fieldType = 'field', name = 'element', ...rest }) => (
  <Query
    query={GET_ELEMENTS}
    variables={{
      offset: -1
    }}
  >
    {({ data, loading, error }) => {
      if (error) console.error(error);
      if (loading) return <Loading />;

      const options = [
        /* {
          label: <FormattedSimpleMsg id='global.select_element' /> ,
          value: ""
        } */
      ];

      if (data && data.searchElement && data.searchElement.elements) {
        data.searchElement.elements.forEach(elem => {
          options.push({
            label: elem.elementTitle,
            value: elem.element
          });
        });
      }

      if (fieldType === 'field') {
        return (
          <Field
            type="select"
            name={name}
            label={<FormattedMessage id="global.element" />}
            options={options}
            placeholder={<FormattedSimpleMsg id="global.selectElement" />}
            {...rest}
          />
        );
      }

      const { value, ...restProps } = rest;

      return (
        <ReactSelect
          name={name}
          options={options}
          placeholder={<FormattedSimpleMsg id="global.selectElement" />}
          value={getSelectValue(value, options)}
          {...restProps}
        />
      );
    }}
  </Query>
);

ElementsSelect.displayName = 'ElementsSelect';

export default ElementsSelect;
