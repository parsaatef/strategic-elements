import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const MineForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <ElementsSelect />

      <Field
        type="text"
        name="title"
        label={<FormattedMessage id="global.title" />}
      />

      <Field
        type="number"
        name="productionValue"
        label={<FormattedMessage id="global.production" />}
      />

      <Field
        type="number"
        name="activeMines"
        label={<FormattedMessage id="global.activeMines" />}
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

export default MineForm;
