import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg, getElementsGroups } from '../../../utils/utility';
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
        <Field
          type="text"
          name="element"
          label={<FormattedMessage id="global.element" />}
        />
      )}

      <Field
        type="text"
        name="elementTitle"
        label={<FormattedMessage id="global.elementTitle" />}
      />

      <Field
        type="text"
        name="symbol"
        label={<FormattedMessage id="global.symbol" />}
      />

      <Field
        type="text"
        name="chemicalFormula"
        label={<FormattedMessage id="global.chemicalFormula" />}
      />

      <Field
        type="text"
        name="phaseAtSTP"
        label={<FormattedMessage id="global.phaseAtSTP" />}
      />

      <Field
        type="number"
        name="density"
        label={<FormattedMessage id="global.density" />}
      />

      <Field
        type="number"
        name="meltingPoint"
        label={<FormattedMessage id="global.meltingPoint" />}
      />

      <Field
        type="number"
        name="boilingPoint"
        label={<FormattedMessage id="global.boilingPoint" />}
      />

      <Field
        type="number"
        name="hardness"
        label={<FormattedMessage id="global.hardness" />}
      />

      <Field
        type="checkbox"
        name="toxicity"
        label={<FormattedMessage id="global.toxicity" />}
      />

      <Field
        type="checkbox"
        name="magneticProperty"
        label={<FormattedMessage id="global.magneticProperty" />}
      />

      <Field
        type="text"
        name="electricalConductivity"
        label={<FormattedMessage id="global.electricalConductivity" />}
      />

      <Field
        type="select"
        name="group"
        label={<FormattedMessage id="global.group" />}
        options={getElementsGroups()}
        placeholder=<FormattedSimpleMsg id="global.group" />
      />

      <Field
        type="text"
        name="period"
        label={<FormattedMessage id="global.period" />}
      />

      <Field
        type="number"
        name="atomicWeight"
        label={<FormattedMessage id="global.atomicWeight" />}
      />

      <Field
        type="number"
        name="electronegativity"
        label={<FormattedMessage id="global.electronegativity" />}
      />

      <Field
        type="text"
        name="oxidationStates"
        label={<FormattedMessage id="global.oxidationStates" />}
      />

      <Field
        type="text"
        name="electronConfiguration"
        label={<FormattedMessage id="global.electronConfiguration" />}
      />

      <Field
        type="number"
        name="atomicRadius"
        label={<FormattedMessage id="global.atomicRadius" />}
      />

      <Field
        type="number"
        name="concentrationInEarthsCrust"
        label={<FormattedMessage id="global.concentrationInEarthsCrust" />}
      />

      <Field
        type="text"
        name="description"
        label={<FormattedMessage id="global.description" />}
      />

      <Field
        type="editor"
        name="relatedIndustryDesc"
        label={<FormattedMessage id="global.relatedIndustryDesc" />}
      />

      <Field
        type="editor"
        name="technologyLevelDesc"
        label={<FormattedMessage id="global.technologyLevelDesc" />}
      />

      <Field
        type="editor"
        name="lowLevelIndustryDesc"
        label={<FormattedMessage id="global.lowLevelIndustryDesc" />}
      />

      <Field
        type="editor"
        name="threatyDesc"
        label={<FormattedMessage id="global.threatyDesc" />}
      />

      <Field
        type="editor"
        name="secondaryResourcesDesc"
        label={<FormattedMessage id="global.secondaryResourcesDesc" />}
      />

      <Field
        type="editor"
        name="ecologyDesc"
        label={<FormattedMessage id="global.ecologyDesc" />}
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

export default ElementForm;
