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

const MineralForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      <ElementsSelect name="element" />

      <Field
        type="text"
        name="title"
        label={<FormattedMessage id="global.title" />}
      />

      <Field
        type="select"
        name="level"
        label={<FormattedMessage id="global.level" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
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
        name="availabilityInIran"
        label={<FormattedMessage id="global.availabilityInIran" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
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

export default MineralForm;
