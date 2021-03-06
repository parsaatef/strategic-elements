import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FormElement from './Form';
import { addStaticVariables } from '../../utils/utility';
import PageHeadingIcon from '../General/PageHeadingIcon';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(register, values) {
    // , { setSubmitting }

    this.setState(
      {
        formValues: values
      },
      () => {
        register()
          .then(async ({ data }) => {
            const { history, listRoute } = this.props;

            history.push(listRoute);

            return data;
          })
          .catch(e => {
            console.error(e);
          });

        // setSubmitting(false);
      }
    );
  }

  render() {
    const { formValues } = this.state;

    const { type, id, query, heading, icon } = this.props;

    let variables =
      type === 'register' ? { ...formValues } : { ...formValues, id };

    const queryInfo = type === 'register' ? query.register : query.update;

    variables = addStaticVariables(queryInfo, variables);

    return (
      <div>
        <PageHeadingIcon
          className="without-border admin-register-edit-heading"
          icon={icon}
          title={heading}
        />

        <Mutation mutation={queryInfo.gql} variables={variables}>
          {(register, { loading, error }) => (
            <FormElement
              loading={loading}
              error={error}
              submitForm={this.handleSubmit.bind(this, register)}
              {...this.props}
            />
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Register);
