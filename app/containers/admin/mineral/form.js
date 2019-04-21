import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';

const AbundanceOptions = [
  { value: 'Abundance1', label: 'Abundance1' },
  { value: 'Abundance2', label: 'Abundance2' }
];

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const MineralForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <Field
        type="text"
        name="title"
        label={<FormattedMessage id="global.title" />}
      />

      <Field
        type="text"
        name="formula"
        label={<FormattedMessage id="global.formula" />}
      />

      <Field
        type="select"
        name="abundance"
        label={<FormattedMessage id="global.abundance" />}
        options={AbundanceOptions}
        placeholder={<FormattedSimpleMsg id="global.select" />}
      />

      <Field
        type="text"
        name="color"
        label={<FormattedMessage id="global.color" />}
      />

      <Field
        multiple
        type="select"
        name="elements"
        label={<FormattedMessage id="global.elements" />}
        options={[
          { value: 'element1', label: 'Element 1' },
          { value: 'element2', label: 'Element 2' }
        ]}
        placeholder={<FormattedSimpleMsg id="global.selectElement" />}
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

export default MineralForm;
