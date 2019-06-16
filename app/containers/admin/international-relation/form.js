import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { getCountries, getQualityLevel } from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';

const options = getQualityLevel();

const countries = getCountries();

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
      <Field
        type="select"
        name="country"
        label={<FormattedMessage id="global.country" />}
        options={countries}
        placeholder={<FormattedMessage id="global.select" />}
        required
      />

      <Field
        type="select"
        name="relationLevel"
        label={<FormattedMessage id="global.relationLevel" />}
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
