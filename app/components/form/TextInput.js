import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import onChange from './onChange';

const { Control, Group, Label } = Form;

type Props = {
  type: string,
  name: string,
  value: string,
  label: string,
  error: array | string,
  handleChange: () => void,
  required: boolean
};

const TextInput = ({
  type = 'text',
  name,
  value,
  handleChange,
  label,
  error,
  required
}: Props) => (
  <Group
    as={Row}
    className="animated fadeIn fast animation-auto-delay"
    controlId={`field_${name}`}
  >
    <Label column sm={4}>
      {label}
      {required && <span className="text-danger">*</span>}
    </Label>
    <Col sm={8}>
      <Control
        type={type}
        name={name}
        value={value}
        onChange={onChange.bind(null, handleChange)}
        isInvalid={!!error}
      />

      <Control.Feedback type="invalid">{error}</Control.Feedback>
    </Col>
  </Group>
);
export default TextInput;
