import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';
import { FormattedSimpleMsg, getUnit } from '../../../utils/utility';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const MineForm = (props: Props) => {
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
        type="number"
        name="productionValue"
        label={<FormattedMessage id="global.productionSave" />}
      />

      <Field
        type="checkbox"
        name="activeMines"
        label={<FormattedMessage id="global.is_active_mine" />}
      />

      <Field
        type="select"
        name="unit"
        label={<FormattedMessage id="global.unit" />}
        options={getUnit()}
        placeholder={<FormattedSimpleMsg id="global.select" />}
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

export default MineForm;
