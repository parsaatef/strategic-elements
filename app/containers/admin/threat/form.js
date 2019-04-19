import React from 'react';
import { Button } from 'react-bootstrap';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';

const Options = [
  { value: 'very_high', label: 'Very high' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
  { value: 'very_low', label: 'Very low' }
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
      <Field type="text" name="name" label="Title" />

      <Field
        type="select"
        name="value"
        label="Value"
        options={Options}
        placeholder="select"
      />

      <Button type="submit">
        {formType === 'register' ? <>Add New Element</> : <>Update Element</>}
      </Button>
    </AppForm>
  );
};

export default MineralForm;
