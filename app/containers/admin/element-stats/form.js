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
          { value: 'element-1', label: 'Element 1' },
          { value: 'element-2', label: 'Element 2' }
        ]}
        placeholder="Select Element"
      />

      <Field
        type="select"
        name="locationType"
        label="Location Type"
        options={[
          { value: 'world', label: 'World' },
          { value: 'iran', label: 'Iran' }
        ]}
        placeholder="Select"
      />

      <Field type="text" name="location" label="Location" />

      <Field type="number" name="year" label="Year" />

      <Field type="number" name="exportValue" label="Export Value" />

      <Field type="number" name="resourceValue" label="Resource Value" />

      <Field type="number" name="productionValue" label="Production Value" />

      <Field type="number" name="consumptionValue" label="Consumption Value" />

      <Field type="number" name="importValue" label="Import Value" />

      <Field
        type="number"
        name="secondaryProductionValue"
        label="Secondary Production Value"
      />

      <Field type="number" name="mineCount" label="Mine Count" />

      <Field type="text" name="unit" label="Unit" />

      <Field type="textarea" name="description" label="Description" />

      <Button type="submit">
        {formType === 'register' ? <>Add New Element</> : <>Update Element</>}
      </Button>
    </AppForm>
  );
};

export default ElementForm;
