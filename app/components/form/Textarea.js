import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import onChange from './onChange';

const { Control, Group, Label } = Form;

const Textarea = ({ name, value, handleChange, label, error, ...rest }) => (
  <Group
    className="animated fadeInUp fast animation-auto-delay"
    as={Row}
    controlId={`field_${name}`}
  >
    <Label column sm={3}>
      {label}
    </Label>
    <Col sm={9}>
      <Control
        as="textarea"
        rows="3"
        name={name}
        value={value}
        onChange={onChange.bind(null, handleChange)}
        isInvalid={!!error}
        {...rest}
      />
      <Control.Feedback type="invalid">{error}</Control.Feedback>
    </Col>
  </Group>
);

export default Textarea;
