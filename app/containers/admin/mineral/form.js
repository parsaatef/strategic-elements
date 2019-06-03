import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';

const AbundanceOptions = [
  { value: 'Abundance1', label: 'Abundance1' },
  { value: 'Abundance2', label: 'Abundance2' }
];

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
      <ElementsSelect className="multiple-select" name="element" multiple />

      <Field
        type="text"
        name="title"
        label={<FormattedMessage id="global.title" />}
      />

      <Field
        type="text"
        name="alias"
        label={<FormattedMessage id="global.alias" />}
      />

      <Field
        type="text"
        name="formula"
        label={<FormattedMessage id="global.formula" />}
      />

      <Field
        type="select"
        name="abundance"
        label={<FormattedMessage id="global.abundance" />}
        options={AbundanceOptions}
        placeholder={<FormattedSimpleMsg id="global.select" />}
      />

      <Field
        type="text"
        name="color"
        label={<FormattedMessage id="global.color" />}
      />

      <Field
        type="textarea"
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
