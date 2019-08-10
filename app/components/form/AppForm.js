import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'underscore';
import deepClone from 'underscore.deepclone';

_.mixin(deepClone);

/**
 * Type checking
 */
type Props = {
  children: React.Node,
  initialValues: object,
  schema: object,
  onSubmit: () => void
};

/**
 * Manage Forms and fields on app
 * @class AppForm
 */
class AppForm extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      values: this.setInitialValues(),
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { initialValues } = this.props;

    const self = this;

    if (!_.isEqual(prevProps.initialValues, initialValues)) {
      self.setState({
        values: this.setInitialValues()
      });
    }
  }

  /**
   * set Initial Values
   * @returns {{}}
   */
  setInitialValues() {
    const { initialValues } = this.props;

    const newValues = initialValues ? _.deepClone(initialValues) : {};

    _.each(initialValues, (value, key) => {
      if (_.isNull(value)) {
        delete newValues[key];
      }
    });

    return newValues;
  }

  /**
   * handle fileds change
   * @param name
   * @param value
   */
  handleChange(name, value) {
    this.setState(
      state => {
        const newValues = _.clone(state.values);

        if (value || value === 0 || value === false) {
          newValues[name] = value;
        } else if (!_.isUndefined(newValues[name])) {
          delete newValues[name];
        }

        return {
          values: newValues
        };
      },
      () => {
        if (!(value || value === 0 || value === false)) {
          return;
        }

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

  /**
   * handle form submit
   * @param e
   */
  handleSubmit(e) {
    e.preventDefault();

    const { onSubmit, schema } = this.props;

    const { values } = this.state;

    if (schema && schema.validate) {
      schema
        .validate(values, { abortEarly: false })
        .then(() => {
          onSubmit(schema.cast(values));
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

  /**
   * set form fileds errors
   * @param name
   * @param errors
   */
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

  /**
   * hamdle form fields as valid field
   * @param children
   * @returns {*}
   */
  mapChildren(children) {
    const { values, errors } = this.state;

    return React.Children.map(children, child => {
      if (
        child &&
        child.type &&
        (child.type.displayName === 'Field' ||
          child.type.displayName === 'ElementsSelect' ||
          child.type.displayName === 'MineralsSelect')
      ) {
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
        });
      }

      return child;
    });
  }

  /**
   * render of form
   * @returns {*}
   */
  render() {
    const { children } = this.props;

    const { values, errors } = this.state;

    return (
      <Form
        noValidate
        onSubmit={this.handleSubmit}
        className="smfp-form-container"
      >
        {!_.isFunction(children)
          ? this.mapChildren(children)
          : this.mapChildren(children(values, errors).props.children)}
      </Form>
    );
  }
}

export default AppForm;
