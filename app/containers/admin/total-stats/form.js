import React from 'react';
import { Button } from 'react-bootstrap';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const TotalStatsForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <Field
        type="select"
        name="element"
        label="Element"
        options={[
          { value: 'element1', label: 'Element 1' },
          { value: 'element2', label: 'Element 2' }
        ]}
        placeholder="Select Element"
      />

      <Field type="text" name="name" label="Name" />

      <Field type="number" name="year" label="Year" />

      <Field type="number" name="value" label="Value" />

      <Field type="text" name="unit" label="Unit" />

      <Button type="submit">
        {formType === 'register' ? <>Add New Stat</> : <>Update Stat</>}
      </Button>
    </AppForm>
  );
};

export default TotalStatsForm;
