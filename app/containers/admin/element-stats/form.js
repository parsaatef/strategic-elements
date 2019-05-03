import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getCountries } from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const ElementForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <ElementsSelect />

      <Field
        type="select"
        name="locationType"
        label={<FormattedMessage id="global.locationType" />}
        options={[
          { value: 'world', label: <FormattedSimpleMsg id="global.world" /> },
          { value: 'iran', label: <FormattedSimpleMsg id="global.iran" /> }
        ]}
        placeholder={<FormattedSimpleMsg id="global.select" />}
      />

      <Field
        type="select"
        name="location"
        label={<FormattedMessage id="global.location" />}
        options={getCountries()}
        placeholder={<FormattedSimpleMsg id="global.selectElement" />}
      />

      <Field
        type="select"
        name="location"
        label={<FormattedMessage id="global.location" />}
        options={getCountries()}
        placeholder={<FormattedSimpleMsg id="global.location" />}
      />

      <Field
        type="number"
        name="year"
        label={<FormattedMessage id="global.year" />}
      />

      <Field
        type="number"
        name="exportValue"
        label={<FormattedMessage id="global.exportValue" />}
      />

      <Field
        type="number"
        name="resourceValue"
        label={<FormattedMessage id="global.resourceValue" />}
      />

      <Field
        type="number"
        name="productionValue"
        label={<FormattedMessage id="global.productionValue" />}
      />

      <Field
        type="number"
        name="consumptionValue"
        label={<FormattedMessage id="global.consumptionValue" />}
      />

      <Field
        type="number"
        name="importValue"
        label={<FormattedMessage id="global.importValue" />}
      />

      <Field
        type="number"
        name="secondaryProductionValue"
        label={<FormattedMessage id="global.secondaryProductionValue" />}
      />

      <Field
        type="number"
        name="mineCount"
        label={<FormattedMessage id="global.minesCount" />}
      />

      <Field
        type="text"
        name="unit"
        label={<FormattedMessage id="global.unit" />}
      />

      <Field
        type="textarea"
        name="description"
        label={<FormattedMessage id="global.description" />}
      />

      <Button type="submit">
        {formType === 'register' ? (
          <FormattedMessage id="global.addNew" />
        ) : (
          <FormattedMessage id="global.update" />
        )}
      </Button>
    </AppForm>
  );
};

export default ElementForm;
