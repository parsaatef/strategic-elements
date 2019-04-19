import React from 'react';
import { Button } from 'react-bootstrap';
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
      <Field type="text" name="title" label="Mineral Title" />

      <Field type="text" name="formula" label="Formula" />

      <Field
        type="select"
        name="abundance"
        label="Abundance"
        options={AbundanceOptions}
        placeholder="Abundance"
      />

      <Field type="text" name="color" label="Color" />

      <Field
        multiple
        type="select"
        name="elements"
        label="Elements"
        options={AbundanceOptions}
        placeholder="Elements"
      />

      <Field type="textarea" name="description" label="Description" />

      <Button type="submit">
        {formType === 'register' ? <>Add New Element</> : <>Update Element</>}
      </Button>
    </AppForm>
  );
};

export default MineralForm;
