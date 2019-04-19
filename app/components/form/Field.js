import React, { Component } from 'react';
import TextInput from './TextInput';
import Select from './Select';
import Textarea from './Textarea';

class Field extends Component {
  render() {
    const {
      type,
      name,
      label,
      value,
      handleChange,
      error,
      options,
      ...rest
    } = this.props;

    if (type === 'text') {
      return (
        <TextInput
          name={name}
          value={value}
          handleChange={handleChange}
          label={label}
          error={error}
          {...rest}
        />
      );
    }

    if (type === 'select') {
      return (
        <Select
          name={name}
          value={value}
          handleChange={handleChange}
          label={label}
          error={error}
          options={options}
          {...rest}
        />
      );
    }

    if (type === 'textarea') {
      return (
        <Textarea
          name={name}
          value={value}
          handleChange={handleChange}
          label={label}
          error={error}
          {...rest}
        />
      );
    }

    return null;
  }
}

export default Field;
