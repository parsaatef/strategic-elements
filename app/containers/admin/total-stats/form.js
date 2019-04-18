import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'underscore';

const { Control, Group, Label } = Form;

type Props = {
  formType: string,
  errors: object,
  values: object,
  touched: object,
  handleChange: () => void,
  handleSubmit: () => void
};

class ElementForm extends Component<Props> {
  render() {
    const {
      handleSubmit,
      handleChange,
      /*
        handleBlur,
        */
      values,
      touched,
      /*
        isValid,
        */
      errors,
      formType
    } = this.props;
    console.log('------this.props----', this.props);

    return (
      <Form noValidate onSubmit={handleSubmit} className="smfp-form-container">
        <Group as={Row} controlId="total_stats_element">
          <Label column sm={3}>
            Element
          </Label>
          <Col sm={9}>
            <Control
              as="select"
              value={values.element}
              onChange={handleChange}
              isValid={touched.element && !errors.element}
            >
              <option value="element1">Element 1</option>
              <option value="element2">Element 2</option>
            </Control>
          </Col>
          <Control.Feedback type="invalid">{errors.element}</Control.Feedback>
        </Group>

        <Group as={Row} controlId="total_stats_name">
          <Label column sm={3}>
            Name
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={!_.isUndefined(values.name) && errors.name}
            />
          </Col>
          <Control.Feedback type="invalid">{errors.name}</Control.Feedback>
        </Group>

        <Group as={Row} controlId="total_stats_year">
          <Label column sm={3}>
            Year
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="year"
              value={values.year}
              onChange={handleChange}
              isInvalid={!_.isUndefined(values.year) && errors.year}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="total_stats_value">
          <Label column sm={3}>
            Value
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="value"
              value={values.value}
              onChange={handleChange}
              isInvalid={!_.isUndefined(values.value) && errors.value}
            />
          </Col>
        </Group>

        <Button type="submit">
          {formType === 'register' ? <>Add New Element</> : <>Update Element</>}
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location
});

export default connect(mapStateToProps)(ElementForm);
