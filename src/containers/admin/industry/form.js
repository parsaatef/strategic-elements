import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { getQualityLevel, getIndustryTypes } from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';

const options = getQualityLevel();
const typeOptions = getIndustryTypes();

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const DependenceIndustriesForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <ElementsSelect name="element" required />

      <Field
        type="text"
        name="title"
        label={<FormattedMessage id="global.industryName" />}
        required
      />

      <Field
        type="select"
        name="type"
        label={<FormattedMessage id="global.type" />}
        options={typeOptions}
        placeholder={<FormattedMessage id="global.select" />}
        required
      />

      <Field
        type="select"
        name="strategicImportance"
        label={<FormattedMessage id="global.strategicImportance" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
      />

      <Field
        type="select"
        name="economicSignificance"
        label={<FormattedMessage id="global.economicSignificance" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
      />

      <Field
        type="select"
        name="jobCreationRate"
        label={<FormattedMessage id="global.jobCreationRate" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
      />

      <Field
        type="textarea"
        name="description"
        label={<FormattedMessage id="global.description" />}
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

export default DependenceIndustriesForm;
