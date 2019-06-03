import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getPriceUnit,
  getYearOptions
} from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const GlobalPriceForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;
  const yearOptions = getYearOptions(1950, 2050);

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <ElementsSelect name="element" />

      <Field
        type="select"
        name="year"
        label={<FormattedMessage id="global.year" />}
        options={yearOptions}
        placeholder={<FormattedSimpleMsg id="global.year" />}
      />

      <Field
        type="number"
        name="price"
        label=<FormattedMessage id="global.price" />
      />

      <Field
        type="select"
        name="unit"
        label={<FormattedMessage id="global.unit" />}
        options={getPriceUnit()}
        placeholder={<FormattedSimpleMsg id="global.select" />}
      />

      <Field
        type="textarea"
        name="description"
        label={<FormattedMessage id="global.description" />}
      />

      <div className="animated fadeIn fast animation-auto-delay">
        <Button type="submit">
          {formType === 'register' ? (
            <FormattedMessage id="global.addNew" />
          ) : (
            <FormattedMessage id="global.update" />
          )}
        </Button>
      </div>
    </AppForm>
  );
};

export default GlobalPriceForm;
