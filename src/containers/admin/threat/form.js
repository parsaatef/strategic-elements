import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { getQualityLevel } from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';

const options = getQualityLevel();

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const ThreatForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <ElementsSelect name="element" required />

      <Field
        type="select"
        name="effectivenessSanctions"
        label={<FormattedMessage id="global.effectivenessSanctions" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
      />

      <Field
        type="select"
        name="impactTariffs"
        label={<FormattedMessage id="global.impactTariffs" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
      />

      <Field
        type="select"
        name="levelGovernmentalSupport"
        label={<FormattedMessage id="global.levelGovernmentalSupport" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
      />

      <Field
        type="select"
        name="diffRawMaterialValueAProcessedProduct"
        label={
          <FormattedMessage id="global.diffRawMaterialValueAProcessedProduct" />
        }
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
        required
      />

      <Field
        type="editor"
        name="moreInfo"
        label={<FormattedMessage id="global.moreInfo" />}
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

export default ThreatForm;
