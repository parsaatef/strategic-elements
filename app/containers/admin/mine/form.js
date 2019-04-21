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

const MineForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <Field type="text" name="title" label="Mine Title" />

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

      <Field type="text" name="unit" label="Unit" />

      <Field type="number" name="productionValue" label="Production" />

      <Field type="number" name="activeMines" label="Active Mines" />

      <Field type="textarea" name="description" label="Description" />

      <Button type="submit">
        {formType === 'register' ? <>Add New Mine</> : <>Update Mine</>}
      </Button>
    </AppForm>
  );
};

export default MineForm;
