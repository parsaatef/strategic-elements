import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';

const Options = [
  { value: 'very_high', label: <FormattedSimpleMsg id="global.veryHigh" /> },
  { value: 'high', label: <FormattedSimpleMsg id="global.high" /> },
  { value: 'medium', label: <FormattedSimpleMsg id="global.medium" /> },
  { value: 'low', label: <FormattedSimpleMsg id="global.low" /> },
  { value: 'very_low', label: <FormattedSimpleMsg id="global.veryLow" /> }
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
      <Field
        type="text"
        name="name"
        label={<FormattedMessage id="global.title" />}
      />

      <Field
        type="select"
        name="value"
        label={<FormattedMessage id="global.problem" />}
        options={Options}
        placeholder={<FormattedMessage id="global.select" />}
      />

      <ElementsSelect name="element" />

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
