import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FormattedSimpleMsg } from '../../../utils/utility';
import AppForm from '../../../components/form/AppForm';
import Field from '../../../components/form/Field';

type Props = {
  formType: string,
  initialValues: object,
  validationSchema: object,
  onSubmit: () => void
};

const UserForm = (props: Props) => {
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
        label={<FormattedMessage id="global.name" />}
      />

      {formType === 'register' && (
        <Field
          type="text"
          name="username"
          label={<FormattedMessage id="global.username" />}
        />
      )}

      <Field
        type="text"
        name="email"
        label={<FormattedMessage id="global.email" />}
      />

      <Field
        type="password"
        name="password"
        label={<FormattedMessage id="global.password" />}
      />

      <Field
        type="password"
        name="passwordConfirmation"
        label={<FormattedMessage id="global.passwordConfirmation" />}
      />

      <Field
        type="select"
        name="role"
        label={<FormattedMessage id="global.role" />}
        options={[
          {
            value: 'user',
            label: <FormattedSimpleMsg id="global.user_role" />
          },
          {
            value: 'admin',
            label: <FormattedSimpleMsg id="global.admin_role" />
          }
        ]}
        placeholder=<FormattedSimpleMsg id="global.select_role" />
      />

      <Button type="submit">
        {formType === 'register' ? (
          <FormattedMessage id="global.signUp" />
        ) : (
          <FormattedMessage id="global.update" />
        )}
      </Button>
    </AppForm>
  );
};

export default UserForm;
