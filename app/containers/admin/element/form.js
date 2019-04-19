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
      {formType === 'register' && (
        <Field type="text" name="element" label="Element" />
      )}

      <Field type="text" name="elementTitle" label="Element Title" />

      <Field type="text" name="symbol" label="Symbol" />

      <Field type="text" name="chemicalFormula" label="Chemical Formula" />

      <Field type="text" name="phaseAtSTP" label="Phase At STP" />

      <Field type="number" name="density" label="Density" />

      <Field type="number" name="meltingPoint" label="Melting Point" />

      <Field type="number" name="boilingPoint" label="Boiling Point" />

      <Field type="number" name="hardness" label="Hardness" />

      <Field type="checkbox" name="toxicity" label="Toxicity" />

      <Field
        type="checkbox"
        name="magneticProperty"
        label="Magnetic Property"
      />

      <Field
        type="text"
        name="electricalConductivity"
        label="Electrical Conductivity"
      />

      <Field
        type="text"
        name="electricalConductivity"
        label="Electrical Conductivity"
      />

      <Field
        type="select"
        name="group"
        label="Group"
        options={[
          { value: 'group-1', label: 'Group 1' },
          { value: 'group-2', label: 'Group 2' }
        ]}
        placeholder="Abundance"
      />

      <Field type="text" name="period" label="Period" />

      <Field type="number" name="atomicWeight" label="Atomic Weight" />

      <Field type="number" name="electronegativity" label="Electronegativity" />

      <Field type="text" name="oxidationStates" label="Oxidation States" />

      <Field
        type="text"
        name="electronConfiguration"
        label="Electron Configuration"
      />

      <Field type="number" name="atomicRadius" label="Atomic Radius" />

      <Field
        type="number"
        name="concentrationInEarthsCrust"
        label="Concentration In Earths Crust"
      />

      <Field type="text" name="description" label="Description" />

      <Field
        type="text"
        name="relatedIndustryDesc"
        label="Related Industry Desc"
      />

      <Field
        type="text"
        name="technologyLevelDesc"
        label="Technology Level Desc"
      />

      <Field
        type="text"
        name="lowLevelIndustryDesc"
        label="Low Level Industry Desc"
      />

      <Field type="text" name="threatyDesc" label="Threaty Desc" />

      <Field
        type="text"
        name="secondaryResourcesDesc"
        label="Secondary Resources Desc"
      />

      <Field type="text" name="ecologyDesc" label="Ecology Desc" />

      <Button type="submit">
        {formType === 'register' ? <>Add New Element</> : <>Update Element</>}
      </Button>
    </AppForm>
  );
};

export default ElementForm;
