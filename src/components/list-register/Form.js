import React, { Component } from 'react';

class FormElement extends Component<Props> {
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

    return (
      <section className="form-wrapper animated fadeInUp fast delay-1-5s">
        <FormComponent
          validationSchema={validationSchema}
          onSubmit={submitForm}
          initialValues={initialValues}
          formType={type}
        />
      </section>
    );
  }
}

export default FormElement;
