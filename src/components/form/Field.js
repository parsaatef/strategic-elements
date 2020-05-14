import React, { Component } from 'react';
import TextInput from './TextInput';
import Select from './Select';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import TextEditor from './TextEditor';

class Field extends Component {
  shouldComponentUpdate(nextProps) {
    const { value, error, options } = this.props;

    return (
      nextProps.error !== error ||
      nextProps.value !== value ||
      nextProps.options !== options
    );
  }

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

    if (type === 'text' || type === 'number' || type === 'password') {
      return (
        <TextInput
          type={type}
          name={name}
          value={value}
          handleChange={handleChange}
          label={label}
          error={error}
          {...rest}
        />
      );
    }

    if (type === 'checkbox') {
      return (
        <Checkbox
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

    if (type === 'editor') {
      return (
        <TextEditor
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

Field.displayName = 'Field';

export default Field;
