import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'underscore';
import ReactSelect from 'react-select';

const { Control, Group, Label } = Form;

const Select = ({
  name,
  value,
  handleChange,
  label,
  options,
  error,
  multiple,
  ...rest
}) => {
  let selectedValue = '';

  let currentVal = value;

  if (multiple && !value) {
    currentVal = [];
  }

  if (!multiple && !value) {
    currentVal = '';
  }

  if (!multiple) {
    selectedValue = options.find(option => option.value === currentVal);
    // selectedValue = selectedItem ? selectedItem : "";
  } else {
    selectedValue = options.filter(option => currentVal.includes(option.value));
  }

  return (
    <Group
      className="animated fadeInUpBig slow animation-auto-delay animation-fill-mode-backwards"
      as={Row}
      controlId={`field_${name}`}
    >
      <Label column sm={3}>
        {label}
      </Label>
      <Col sm={9}>
        <ReactSelect
          isMulti={multiple}
          name={name}
          value={selectedValue}
          onChange={selectedOption => {
            const newValue = multiple
              ? _.pluck(selectedOption, 'value')
              : selectedOption.value;
            handleChange(name, newValue);
          }}
          options={options}
          isInvalid={!!error}
          {...rest}
        />
        <Control.Feedback type="invalid">{error}</Control.Feedback>
      </Col>
    </Group>
  );
};

export default Select;
