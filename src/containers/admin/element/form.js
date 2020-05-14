import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getPhaseAtSTPOptions,
  getElCOptions,
  getElementPeriod,
  getElementsCategory,
  getQualityLevel,
  getElementsGroups,
  getMagneticPropertyOptions
} from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const groupOptions = getElementsGroups();

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
          label={<FormattedMessage id="global.english_name" />}
          required
        />
      )}

      <Field
        type="text"
        name="elementTitle"
        label={<FormattedMessage id="global.persian_name" />}
        required
      />

      <Field
        type="text"
        name="chemicalFormula"
        label={<FormattedMessage id="global.chemicalFormula" />}
      />

      <Field
        type="text"
        name="symbol"
        label={<FormattedMessage id="global.symbol" />}
        required
      />

      <Field
        type="select"
        name="phaseAtSTP"
        label={<FormattedMessage id="global.phaseAtSTP" />}
        options={getPhaseAtSTPOptions()}
        placeholder=<FormattedSimpleMsg id="global.phaseAtSTP" />
      />

      <Field
        type="select"
        name="group"
        label={<FormattedMessage id="global.group" />}
        options={groupOptions}
        placeholder=<FormattedSimpleMsg id="global.group" />
      />

      <Field
        type="select"
        name="period"
        label={<FormattedMessage id="global.period" />}
        options={getElementPeriod()}
        placeholder=<FormattedSimpleMsg id="global.period" />
      />

      <Field
        type="select"
        name="category"
        label={<FormattedMessage id="global.category" />}
        options={getElementsCategory()}
        required
        placeholder={<FormattedSimpleMsg id="global.category" />}
      />

      <Field
        type="number"
        name="atomicNumber"
        label={<FormattedMessage id="global.atomicNumber" />}
      />

      <Field
        type="number"
        name="atomicWeight"
        label={<FormattedMessage id="global.atomicWeight" />}
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
        type="select"
        name="electricalConductivity"
        label={<FormattedMessage id="global.electricalConductivity" />}
        options={getElCOptions()}
        placeholder=<FormattedSimpleMsg id="global.electricalConductivity" />
      />

      <Field
        type="select"
        name="magneticProperty"
        label={<FormattedMessage id="global.magneticProperty" />}
        options={getMagneticPropertyOptions()}
        placeholder=<FormattedSimpleMsg id="global.magneticProperty" />
      />

      <Field
        type="select"
        name="toxicity"
        label={<FormattedMessage id="global.toxicity" />}
        options={getQualityLevel()}
        placeholder=<FormattedSimpleMsg id="global.toxicity" />
      />

      <Field
        type="number"
        name="concentrationInEarthsCrust"
        label={<FormattedMessage id="global.concentrationInEarthsCrust" />}
      />

      <Field
        type="text"
        name="usage1"
        label={<FormattedMessage id="global.usage1" />}
      />

      <Field
        type="text"
        name="usage2"
        label={<FormattedMessage id="global.usage2" />}
      />

      <Field
        type="text"
        name="usage3"
        label={<FormattedMessage id="global.usage3" />}
      />

      <Field
        type="text"
        name="usage4"
        label={<FormattedMessage id="global.usage4" />}
      />

      <Field
        type="editor"
        name="description"
        label={<FormattedMessage id="global.description" />}
      />

      <div className="animated fadeIn fast animation-auto-delay">
        <Button type="submit">
          {formType === 'register' ? (
            <FormattedMessage id="global.addNew" />
          ) : (
            <FormattedMessage id="global.update" />
          )}
        </Button>
      </div>
    </AppForm>
  );
};

export default ElementForm;
