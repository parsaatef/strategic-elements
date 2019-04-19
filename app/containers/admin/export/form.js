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

const ElementForm = (props: Props) => {
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
          { value: 'group-1', label: 'Group 1' },
          { value: 'group-2', label: 'Group 2' }
        ]}
        placeholder="Select Element"
      />

      <Field type="text" name="location" label="Location" />

      <Field type="number" name="year" label="Year" />

      <Field type="number" name="exportValue" label="Value" />

      <Field type="text" name="unit" label="Unit" />

      <Field type="textarea" name="description" label="Description" />

      <Button type="submit">
        {formType === 'register' ? <>Add New Element</> : <>Update Element</>}
      </Button>
    </AppForm>
  );
};

export default ElementForm;
