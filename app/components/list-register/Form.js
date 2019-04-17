import React, { Component } from 'react';
import { Formik } from 'formik';
import SideEffect from './SideEffect';

class FormElement extends Component<Props> {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(formValues) {
    const { formChange } = this.props;

    formChange(formValues);
  }

  render() {
    const {
      submitForm,
      formCmp,
      validationSchema,
      initialValues = {},
      type
    } = this.props;

    const FormComponent = formCmp;

    // delete initialValues.username;

    // delete initialValues.__typename;

    // delete initialValues.id;

    console.log('-----------initialValues----------', initialValues);

    return (
      <section className="form-wrapper">
        <Formik
          validationSchema={validationSchema}
          onSubmit={submitForm}
          initialValues={initialValues}
        >
          {formikProps => (
            <React.Fragment>
              <SideEffect
                formValues={formikProps.values}
                onChange={this.onChange}
              />
              <FormComponent {...formikProps} formType={type} />
            </React.Fragment>
          )}
        </Formik>
      </section>
    );
  }
}

export default FormElement;
