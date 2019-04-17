import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FormElement from './Form';

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

    const { type, id, query } = this.props;

    return (
      <div>
        <h4 id="add-new-user">Add New Element</h4>

        <Mutation
          mutation={type === 'register' ? query.register.gql : query.update.gql}
          variables={
            type === 'register' ? { ...formValues } : { ...formValues, id }
          }
        >
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
