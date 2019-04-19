import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import _ from 'underscore';

const { Control, Group, Label } = Form;

type Props = {
  name: string,
  errors: object,
  values: object,
  handleChange: () => void
};

const TextInput = ({ name, values, errors, handleChange }: Props) => (
  <Control
    type="text"
    name={name}
    value={!_.isUndefined(values[name]) ? values[name] : ''}
    onChange={handleChange}
    isInvalid={!_.isUndefined(values[name]) && errors[name]}
  />
);

const ErrorMessage = ({ errors, name, values }) => (
  <>
    {!_.isUndefined(values[name]) && (
      <Control.Feedback type="invalid">{errors[name] || null}</Control.Feedback>
    )}
  </>
);

const TextField = ({ name, label, ...rest }) => (
  <Group as={Row} controlId={name}>
    <Label column sm={3}>
      {label}
    </Label>

    <Col sm={9}>
      <TextInput name={name} {...rest} />
    </Col>

    <ErrorMessage name={name} {...rest} />
  </Group>
);

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
    // console.log('------this.props----', this.props);

    return (
      <Form noValidate onSubmit={handleSubmit} className="smfp-form-container">
        {formType === 'register' && (
          <TextField name="element" label="Element" {...this.props} />
        )}

        <Group as={Row} controlId="element_Fa_Title">
          <Label column sm={3}>
            Element Title
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="elementTitle"
              value={values.elementTitle}
              onChange={handleChange}
              isInvalid={
                !_.isUndefined(values.elementTitle) && errors.elementTitle
              }
            />
          </Col>
          <Control.Feedback type="invalid">
            {errors.elementTitle}
          </Control.Feedback>
        </Group>

        <Group as={Row} controlId="element_symbol">
          <Label column sm={3}>
            Symbol
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="symbol"
              value={values.symbol}
              onChange={handleChange}
              isValid={touched.symbol && !errors.symbol}
            />
          </Col>
          <Control.Feedback type="invalid">{errors.symbol}</Control.Feedback>
        </Group>

        <Group as={Row} controlId="element_chemicalFormula">
          <Label column sm={3}>
            Chemical Formula
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="chemicalFormula"
              value={values.chemicalFormula}
              onChange={handleChange}
              isValid={touched.chemicalFormula && !errors.chemicalFormula}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_phaseAtSTP">
          <Label column sm={3}>
            Phase At STP
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="phaseAtSTP"
              value={values.phaseAtSTP}
              onChange={handleChange}
              isValid={touched.phaseAtSTP && !errors.phaseAtSTP}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_density">
          <Label column sm={3}>
            Density
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="density"
              value={values.density}
              onChange={handleChange}
              isValid={touched.density && !errors.density}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_meltingPoint">
          <Label column sm={3}>
            Melting Point
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="meltingPoint"
              value={values.meltingPoint}
              onChange={handleChange}
              isValid={touched.meltingPoint && !errors.meltingPoint}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_boilingPoint">
          <Label column sm={3}>
            Boiling Point
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="boilingPoint"
              value={values.boilingPoint}
              onChange={handleChange}
              isValid={touched.boilingPoint && !errors.boilingPoint}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_hardness">
          <Label column sm={3}>
            Hardness
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="hardness"
              value={values.hardness}
              onChange={handleChange}
              isValid={touched.hardness && !errors.hardness}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_toxicity">
          <Label column sm={3}>
            Toxicity
          </Label>
          <Col sm={9}>
            <Control
              type="checkbox"
              name="toxicity"
              value={values.toxicity}
              onChange={handleChange}
              isValid={touched.toxicity && !errors.toxicity}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_magneticProperty">
          <Label column sm={3}>
            Magnetic Property
          </Label>
          <Col sm={9}>
            <Control
              type="checkbox"
              name="magneticProperty"
              value={values.magneticProperty}
              onChange={handleChange}
              isValid={touched.magneticProperty && !errors.magneticProperty}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_electricalConductivity">
          <Label column sm={3}>
            Electrical Conductivity
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="electricalConductivity"
              value={values.electricalConductivity}
              onChange={handleChange}
              isValid={
                touched.electricalConductivity && !errors.electricalConductivity
              }
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_group">
          <Label column sm={3}>
            group
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="group"
              value={values.group}
              onChange={handleChange}
              isInvalid={!_.isUndefined(values.group) && errors.group}
            />
          </Col>
          <Control.Feedback type="invalid">{errors.group}</Control.Feedback>
        </Group>

        <Group as={Row} controlId="element_period">
          <Label column sm={3}>
            Period
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="period"
              value={values.period}
              onChange={handleChange}
              isValid={touched.period && !errors.period}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_atomicWeight">
          <Label column sm={3}>
            Atomic Weight
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="atomicWeight"
              value={values.atomicWeight}
              onChange={handleChange}
              isValid={touched.atomicWeight && !errors.atomicWeight}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_electronegativity">
          <Label column sm={3}>
            Electronegativity
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="electronegativity"
              value={values.atomicWeight}
              onChange={handleChange}
              isValid={touched.electronegativity && !errors.electronegativity}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_oxidationStates">
          <Label column sm={3}>
            Oxidation States
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="oxidationStates"
              value={values.oxidationStates}
              onChange={handleChange}
              isValid={touched.oxidationStates && !errors.oxidationStates}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_electronConfiguration">
          <Label column sm={3}>
            Electron Configuration
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="electronConfiguration"
              onChange={handleChange}
              value={values.electronConfiguration}
              isValid={
                touched.electronConfiguration && !errors.electronConfiguration
              }
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_atomicRadius">
          <Label column sm={3}>
            Atomic Radius
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="atomicRadius"
              onChange={handleChange}
              value={values.atomicRadius}
              isValid={touched.atomicRadius && !errors.atomicRadius}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_concentrationInEarthsCrust">
          <Label column sm={3}>
            Concentration In Earths Crust
          </Label>
          <Col sm={9}>
            <Control
              type="number"
              name="concentrationInEarthsCrust"
              onChange={handleChange}
              value={values.concentrationInEarthsCrust}
              isValid={
                touched.concentrationInEarthsCrust &&
                !errors.concentrationInEarthsCrust
              }
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_description">
          <Label column sm={3}>
            Description
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="description"
              onChange={handleChange}
              value={values.description}
              isValid={touched.description && !errors.description}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_relatedIndustryDesc">
          <Label column sm={3}>
            Related Industry Desc
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="relatedIndustryDesc"
              onChange={handleChange}
              value={values.relatedIndustryDesc}
              isValid={
                touched.relatedIndustryDesc && !errors.relatedIndustryDesc
              }
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_technologyLevelDesc">
          <Label column sm={3}>
            Technology Level Desc
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="technologyLevelDesc"
              onChange={handleChange}
              value={values.technologyLevelDesc}
              isValid={
                touched.technologyLevelDesc && !errors.technologyLevelDesc
              }
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_lowLevelIndustryDesc">
          <Label column sm={3}>
            Low Level Industry Desc
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="lowLevelIndustryDesc"
              onChange={handleChange}
              value={values.lowLevelIndustryDesc}
              isValid={
                touched.lowLevelIndustryDesc && !errors.lowLevelIndustryDesc
              }
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_threatyDesc">
          <Label column sm={3}>
            Threaty Desc
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="threatyDesc"
              onChange={handleChange}
              value={values.threatyDesc}
              isValid={touched.threatyDesc && !errors.threatyDesc}
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_secondaryResourcesDesc">
          <Label column sm={3}>
            Secondary Resources Desc
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="secondaryResourcesDesc"
              onChange={handleChange}
              value={values.secondaryResourcesDesc}
              isValid={
                touched.secondaryResourcesDesc && !errors.secondaryResourcesDesc
              }
            />
          </Col>
        </Group>

        <Group as={Row} controlId="element_ecologyDesc">
          <Label column sm={3}>
            Ecology Desc
          </Label>
          <Col sm={9}>
            <Control
              type="text"
              name="ecologyDesc"
              onChange={handleChange}
              value={values.ecologyDesc}
              isValid={touched.ecologyDesc && !errors.ecologyDesc}
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

export default ElementForm;
