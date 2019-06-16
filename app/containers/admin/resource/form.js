import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';
import {
  FormattedSimpleMsg,
  getUnit,
  getQualityLevel,
  getCountries
} from '../../../utils/utility';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const countries = getCountries();

const ResourceForm = (props: Props) => {
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
        name="location"
        label={<FormattedMessage id="global.country" />}
        options={countries}
        placeholder={<FormattedSimpleMsg id="global.select_country" />}
        required
      />

      <Field
        type="number"
        name="primarySource"
        label={<FormattedMessage id="global.primarySource" />}
      />

      <Field
        type="select"
        name="unit"
        label={<FormattedMessage id="global.unit" />}
        options={getUnit()}
        placeholder={<FormattedSimpleMsg id="global.select" />}
      />

      <Field
        type="select"
        name="secondarySource"
        label={<FormattedMessage id="global.secondarySource" />}
        options={getQualityLevel()}
        placeholder={<FormattedSimpleMsg id="global.select" />}
      />

      <Field
        type="textarea"
        name="description"
        label={<FormattedMessage id="global.description" />}
      />

      <Field
        type="editor"
        name="moreInfo"
        label={<FormattedMessage id="global.more_info" />}
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

export default ResourceForm;
