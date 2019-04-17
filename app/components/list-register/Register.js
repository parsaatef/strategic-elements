import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FormElement from './Form';
import { addStaticVariables } from '../../utils/utility';
import PageHeading from '../General/PageHeading';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.formChange = this.formChange.bind(this);
  }

  handleSubmit(register, values, { setSubmitting }) {
    register()
      .then(async ({ data }) => {
        console.log('-----------data--------', data);

        const { history, listRoute } = this.props;

        history.push(listRoute);

        return data;
      })
      .catch(e => {
        console.error(e);
      });

    setSubmitting(false);
  }

  formChange(values) {
    this.setState({
      formValues: values
    });
  }

  render() {
    const { formValues } = this.state;

    const { type, id, query, heading } = this.props;

    let variables =
      type === 'register' ? { ...formValues } : { ...formValues, id };

    const queryInfo = type === 'register' ? query.register : query.update;

    variables = addStaticVariables(queryInfo, variables);

    return (
      <div>
        <PageHeading className="admin-register-edit-heading" title={heading} />

        <Mutation mutation={queryInfo.gql} variables={variables}>
          {(register, { loading, error }) => (
            <FormElement
              loading={loading}
              error={error}
              submitForm={this.handleSubmit.bind(this, register)}
              formChange={this.formChange}
              {...this.props}
            />
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Register);
