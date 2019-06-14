import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const { Control, Group, Label } = Form;

type Props = {
  name: string,
  value: string,
  label: string,
  error: array | string,
  handleChange: () => void,
  required: boolean
};

const Checkbox = ({
  name,
  value,
  handleChange,
  label,
  error,
  required
}: Props) => (
  <Group
    className="checkbox-field-group animated fadeIn fast animation-auto-delay"
    as={Row}
    controlId={`field_${name}`}
  >
    <Col sm={12}>
      <Label className="checkbox-wrap">
        <Control
          type="checkbox"
          name={name}
          value="on"
          checked={value}
          onChange={e => handleChange(name, e.target.checked)}
          isInvalid={!!error}
        />
        {label}
        {required && <span className="text-danger">*</span>}
        <span className="checkmark" />
      </Label>
      <Control.Feedback type="invalid">{error}</Control.Feedback>
    </Col>
  </Group>
);

export default Checkbox;
