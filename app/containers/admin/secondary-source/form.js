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
        <Group as={Row} controlId="secondary_source_element">
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

        <Group as={Row} controlId="secondary_source_title">
          <Label column sm={3}>
            Secondary Source Title
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              isInvalid={!_.isUndefined(values.title) && errors.title}
            />
          </Col>
          <Control.Feedback type="invalid">{errors.title}</Control.Feedback>
        </Group>

        <Group as={Row} controlId="secondary_source_year">
          <Label column sm={3}>
            Value
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="value"
              value={values.value}
              onChange={handleChange}
              isInvalid={!_.isUndefined(values.value) && errors.value}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="secondary_source_unit">
          <Label column sm={3}>
            Unit
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="unit"
              value={values.unit}
              onChange={handleChange}
              isValid={touched.unit && !errors.unit}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="secondary_source_description">
          <Label column sm={3}>
            Description
          </Label>
          <Col sm={9}>
            <Control
              as="textarea"
              rows="1"
              name="description"
              value={values.description}
              onChange={handleChange}
              isValid={touched.description && !errors.description}
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