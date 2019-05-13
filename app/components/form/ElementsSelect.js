import React from 'react';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import Field from './Field';
import { GET_ELEMENTS } from '../../queries/element';
import { FormattedSimpleMsg } from '../../utils/utility';

const ElementsSelect = props => (
  <Query
    query={GET_ELEMENTS}
    variables={{
      offset: -1
    }}
  >
    {({ data, loading, error }) => {
      if (error) console.error(error);
      if (loading) return 'loading.....';

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

      return (
        <Field
          type="select"
          name="element"
          label={<FormattedMessage id="global.element" />}
          options={options}
          placeholder={<FormattedSimpleMsg id="global.selectElement" />}
          {...props}
        />
      );
    }}
  </Query>
);

export default ElementsSelect;
