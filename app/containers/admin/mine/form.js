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
        <Group as={Row} controlId="Mine_Title">
          <Label column sm={3}>
            Mine Title
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

        <Group as={Row} controlId="mineral_element">
          <Label column sm={3}>
            Element
          </Label>
          <Col sm={9}>
            <select
              value={values.element}
              onChange={handleChange}
              placeholder="Element"
              isValid={touched.element && !errors.element}
            >
              <option value="element1">Element 1</option>
              <option value="element2">Element 2</option>
            </select>
          </Col>
          <Control.Feedback type="invalid">{errors.element}</Control.Feedback>
        </Group>

        <Group as={Row} controlId="mineral_unit">
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

        <Group as={Row} controlId="element_productionValue">
          <Label column sm={3}>
            Production
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="productionValue"
              value={values.productionValue}
              onChange={handleChange}
              isValid={touched.productionValue && !errors.productionValue}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_activeMines">
          <Label column sm={3}>
            Active Mines
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="activeMines"
              value={values.activeMines}
              onChange={handleChange}
              isValid={touched.activeMines && !errors.activeMines}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="mineral_description">
          <Label column sm={3}>
            Description
          </Label>
          <Col sm={9}>
            <Control
              as="textarea"
              rows="3"
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
