import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {
  FormattedSimpleMsg,
  getCountries,
  // getStates,
  getYearOptions,
  getUnit
} from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';
import ElementsSelect from '../../../components/form/ElementsSelect';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

// const states = getStates();

const countries = getCountries();

const yearOptions = getYearOptions(1990, 2030);

const ElementForm = (props: Props) => {
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

            {/* values.locationType === 'world' && () */}
            <Field
              type="select"
              name="location"
              label={<FormattedMessage id="global.country" />}
              options={countries}
              placeholder={<FormattedSimpleMsg id="global.select_country" />}
              required
            />

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
              type="select"
              name="year"
              label={<FormattedMessage id="global.year" />}
              options={yearOptions}
              placeholder={<FormattedSimpleMsg id="global.year" />}
              required
            />

            <Field
              type="number"
              name="productionValue"
              label={<FormattedMessage id="global.primaryProduction" />}
              required
            />

            <Field
              type="number"
              name="secondaryProductionValue"
              label={<FormattedMessage id="global.secondaryProduction" />}
            />

            {['all', 'other', 'IRN'].includes(values.location) && (
              <Field
                type="number"
                name="consumptionValue"
                label={<FormattedMessage id="global.consumption" />}
              />
            )}

            {values.location !== 'IRN' && (
              <Field
                type="number"
                name="exportValue"
                label={<FormattedMessage id="global.exportValueToIran" />}
              />
            )}

            {values.location !== 'IRN' && (
              <Field
                type="number"
                name="importValue"
                label={<FormattedMessage id="global.importValueFromIran" />}
              />
            )}

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
          </>
        );
      }}
    </AppForm>
  );
};

export default ElementForm;
