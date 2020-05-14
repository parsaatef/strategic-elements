import React from 'react';
import { Query } from 'react-apollo';
import ReactSelect from 'react-select';
import _ from 'underscore';
import Field from './Field';
import { GET_MINERALS } from '../../queries/mineral';
import { FormattedSimpleMsg } from '../../utils/utility';
import Loading from '../General/Loading';

const getSelectValue = (value, options) => _.findWhere(options, { value });

const MineralsSelect = ({
  fieldType = 'field',
  elements = [],
  name = 'mineral',
  label,
  ...rest
}) => (
  <Query
    query={GET_MINERALS}
    variables={{
      offset: -1,
      elements
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
      console.log(
        '-----data.searchMineral.minerals----',
        data.searchMineral.minerals
      );

      if (data && data.searchMineral && data.searchMineral.minerals) {
        data.searchMineral.minerals.forEach(item => {
          options.push({
            label: item.title,
            value: item.alias
          });
        });
      }

      console.log('-------options------', options);

      if (fieldType === 'field') {
        return (
          <Field
            type="select"
            name={name}
            label={label}
            options={options}
            placeholder={<FormattedSimpleMsg id="global.select" />}
            {...rest}
          />
        );
      }

      const { value, ...restProps } = rest;

      return (
        <ReactSelect
          name={name}
          options={options}
          placeholder={<FormattedSimpleMsg id="global.select" />}
          value={getSelectValue(value, options)}
          {...restProps}
        />
      );
    }}
  </Query>
);

MineralsSelect.displayName = 'MineralsSelect';

export default MineralsSelect;
