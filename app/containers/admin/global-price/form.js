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

const GlobalPriceForm = (props: Props) => {
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
          { value: 'Element1', label: 'Element 1' },
          { value: 'Element2', label: 'Element 2' }
        ]}
        placeholder="Select Element"
      />

      <Field type="number" name="year" label="Year" />

      <Field type="number" name="price" label="Price" />

      <Field type="text" name="unit" label="Unit" />

      <Field type="textarea" name="description" label="Description" />

      <Button type="submit">
        {formType === 'register' ? <>Add New Price</> : <>Update Price</>}
      </Button>
    </AppForm>
  );
};

export default GlobalPriceForm;
