import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'underscore';

const { Control, Group, Label } = Form;

const AbundanceOptions = [
  { value: 'Abundance1', label: 'Abundance1' },
  { value: 'Abundance2', label: 'Abundance2' }
];

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
        <Group as={Row} controlId="Mineral_Title">
          <Label column sm={3}>
            Mineral Title
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

        <Group as={Row} controlId="mineral_formula">
          <Label column sm={3}>
            Formula
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="formula"
              value={values.formula}
              onChange={handleChange}
              isValid={touched.formula && !errors.formula}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="mineral_abundance">
          <Label column sm={3}>
            Abundance
          </Label>
          <Col sm={9}>
            <select
              name="abundance"
              value={values.abundance}
              onChange={handleChange}
              options={AbundanceOptions}
              placeholder="Abundance"
              isValid={touched.abundance && !errors.abundance}
            >
              <option value="abundance1">Abundance1</option>
              <option value="abundance2">Abundance2</option>
            </select>
          </Col>
        </Group>

        <Group as={Row} controlId="mineral_color">
          <Label column sm={3}>
            Color
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="color"
              value={values.color}
              onChange={handleChange}
              isValid={touched.color && !errors.color}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="mineral_elements">
          <Label column sm={3}>
            Elements
          </Label>
          <Col sm={9}>
            <select
              multiple
              value={values.elements}
              onChange={handleChange}
              options={AbundanceOptions}
              placeholder="Elements"
              isValid={touched.elements && !errors.elements}
            >
              <option value="element1">Element 1</option>
              <option value="element2">Element 2</option>
            </select>
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
