import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'underscore';
import ReactSelect from 'react-select';

const { Control, Group, Label } = Form;

const Select = (props) => { console.log("----props---", props);

  const {
    name,
    value,
    handleChange,
    label,
    options,
    error,
    multiple,
    required,
    ...rest
  } = props;

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
      className="animated fadeIn fast animation-auto-delay animation-fill-mode-backwards"
      as={Row}
      controlId={`field_${name}`}
    >
      <Label column sm={4}>
        {label}
        {required && <span className="text-danger">*</span>}
      </Label>
      <Col sm={8}>
        <ReactSelect
          isMulti={multiple}
          name={name}
          value={selectedValue}
          onChange={selectedOption => {
            const newValue = multiple
              ? _.pluck(selectedOption, 'value')
              : selectedOption.value; console.log("----newValue---", newValue);
              if (handleChange) { //alert("test");
                handleChange(name, newValue);
              }
          }}
          options={options}
          isInvalid={!!error}
          /*menuIsOpen={true}*/
          {...rest}
        />
        <Control.Feedback type="invalid">{error}</Control.Feedback>
      </Col>
    </Group>
  );
};

export default Select;
