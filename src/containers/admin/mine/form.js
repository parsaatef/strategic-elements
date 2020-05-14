import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';
import MineralsSelect from '../../../components/form/MineralsSelect';
import {
  FormattedSimpleMsg,
  getQualityLevel,
  getMineStatus,
  getStates,
  getUnit
} from '../../../utils/utility';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const states = getStates();

// const countries = getCountries();

const MineForm = (props: Props) => {
  const { onSubmit, formType, initialValues, validationSchema } = props;

  return (
    <AppForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={validationSchema}
    >
      {(values, errors) => {
        console.log('--values, errors---', values, errors);

        return (
          <>
            <ElementsSelect name="element" required />

            <Field
              type="select"
              name="location"
              label={<FormattedMessage id="global.state" />}
              options={states}
              placeholder={<FormattedSimpleMsg id="global.select_state" />}
              required
            />

            <Field
              type="text"
              name="title"
              label={<FormattedMessage id="global.mine_name" />}
              required
            />

            <MineralsSelect
              name="mineral"
              label={<FormattedMessage id="global.main_mineral" />}
              elements={values.element ? [values.element] : []}
            />

            <Field
              type="number"
              name="caratAverage"
              label={<FormattedMessage id="global.caratAverage" />}
            />

            {/* <Field
                type="select"
                name="locationType"
                label={<FormattedMessage id="global.locationType" />}
                options={[
                  {
                    value: 'world',
                    label: <FormattedSimpleMsg id="global.world" />
                  },
                  {
                    value: 'iran',
                    label: <FormattedSimpleMsg id="global.iran" />
                  }
                ]}
                placeholder={<FormattedSimpleMsg id="global.select" />}
              /> */}

            {/* values.locationType === 'world' && (
              <Field
                type="select"
                name="location"
                label={<FormattedMessage id="global.country" />}
                options={countries}
                placeholder={<FormattedSimpleMsg id="global.select_country" />}
              />
            ) */}

            {/* values.locationType === 'iran' && (
              <Field
                type="select"
                name="location"
                label={<FormattedMessage id="global.state" />}
                options={states}
                placeholder={<FormattedSimpleMsg id="global.select_state" />}
              />
            ) */}

            <Field
              type="number"
              name="productionValue"
              label={<FormattedMessage id="global.productionSave" />}
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
              name="status"
              label={<FormattedMessage id="global.status" />}
              options={getMineStatus()}
              placeholder=<FormattedSimpleMsg id="global.select" />
            />

            <Field
              type="select"
              name="impactPreventLocalDeprivation"
              label={
                <FormattedMessage id="global.impact_prevent_local_deprivation" />
              }
              options={getQualityLevel()}
              placeholder=<FormattedSimpleMsg id="global.select" />
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
          </>
        );
      }}
    </AppForm>
  );
};

export default MineForm;
