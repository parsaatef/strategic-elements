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
  handleChange: () => void
};

const TextInput = ({
  type = 'text',
  name,
  value,
  handleChange,
  label,
  error
}: Props) => (
  <Group as={Row} controlId={`field_${name}`}>
    <Label column sm={3}>
      {label}
    </Label>
    <Col sm={9}>
      <Control
        type={type}
        name={name}
        value={value}
        onChange={onChange.bind(null, handleChange)}
        isInvalid={!!error}
      />
    </Col>
    <Control.Feedback type="invalid">{error}</Control.Feedback>
  </Group>
);
export default TextInput;
