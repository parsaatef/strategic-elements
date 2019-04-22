import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const { Control, Group, Check, Label } = Form;

type Props = {
  name: string,
  value: string,
  label: string,
  error: array | string,
  handleChange: () => void
};

const Checkbox = ({ name, value, handleChange, label, error }: Props) => (
  <Group as={Row} controlId={`field_${name}`}>
    <Col sm={12}>
      <Label className="checkbox-wrap">
        <Check
          custom
          type="checkbox"
          label={label}
          name={name}
          value={value}
          onChange={e => handleChange(name, e.target.checked)}
          isInvalid={!!error}
        />
        <span className="checkmark" />
      </Label>
      <Control.Feedback type="invalid">{error}</Control.Feedback>
    </Col>
  </Group>
);

export default Checkbox;
