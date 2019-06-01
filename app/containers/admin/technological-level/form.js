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
        name="name"
        label={<FormattedMessage id="global.title" />}
      />

      <Field
        type="select"
        name="value"
        label={<FormattedMessage id="global.level" />}
        options={options}
        placeholder={<FormattedMessage id="global.select" />}
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

export default MineralForm;
