import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'underscore';

type Props = {
  children: React.Node,
  initialValues: object,
  schema: object,
  onSubmit: () => void
};

class AppForm extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.setState(
      state => {
        const newValues = _.clone(state.values);

        newValues[name] = value;

        return {
          values: newValues
        };
      },
      () => {
        // TODO: maybe we need to validate the fields after each changes
        const { schema } = this.props;

        if (schema && schema.validate) {
          schema
            .validate({ [name]: value }, { abortEarly: false })
            .then(() => {
              this.setErrors(name, false);
              return true;
            })
            .catch(err => {
              let hasError = false;

              err.inner.forEach(error => {
                if (error.path === name) {
                  hasError = error.errors;
                }
              });

              if (hasError) {
                this.setErrors(name, hasError);
              } else {
                this.setErrors(name, false);
              }
            });
        }
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const { onSubmit, schema } = this.props;

    const { values } = this.state;

    if (schema && schema.validate) {
      schema
        .validate(values, { abortEarly: false })
        .then(() => {
          onSubmit(values);
          return true;
        })
        .catch(err => {
          this.setState(() => {
            /**
             * TODO: need to deep Clone
             */
            const newErrors = {};

            err.inner.forEach(error => {
              newErrors[error.path] = error.errors;
            });

            return {
              errors: newErrors
            };
          });
        });
    } else {
      onSubmit(values);
    }
  }

  setErrors(name, errors) {
    this.setState(state => {
      /**
       * TODO: need to deep Clone
       */
      const newErrors = _.clone(state.errors);

      if (errors) {
        newErrors[name] = errors;
      } else if (!_.isUndefined(newErrors[name])) {
        delete newErrors[name];
      }

      return {
        errors: newErrors
      };
    });
  }

  render() {
    const { children, initialValues } = this.props;
    console.log('----initialValues---', initialValues);

    const { values, errors } = this.state;

    return (
      <Form
        noValidate
        onSubmit={this.handleSubmit}
        className="smfp-form-container"
      >
        {React.Children.map(children, child => {
          if (child && child.type && child.type.displayName === 'Field') {
            return React.cloneElement(child, {
              value:
                child.props.name && !_.isUndefined(values[child.props.name])
                  ? values[child.props.name]
                  : '', // child.props.default
              handleChange: this.handleChange,
              error:
                child.props.name && !_.isUndefined(errors[child.props.name])
                  ? errors[child.props.name]
                  : ''
              // defaultValue : child.props.name && !_.isUndefined( initialValues[child.props.name] ) ? initialValues[child.props.name] : null
            });
          }

          return child;
        })}
      </Form>
    );
  }
}

export default AppForm;
