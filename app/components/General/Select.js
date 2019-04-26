import React, { Component } from 'react';
import ReactSelect from 'react-select';

const getSelectedOption = (options, currentVal) =>
  options.find(option => option.value === currentVal) || null;

export default class Select extends Component<Props> {
  constructor(props) {
    super(props);

    const { defaultValue, options } = this.props;

    this.state = {
      selectedOption: getSelectedOption(options, defaultValue)
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption }, () => {
      const { onChange } = this.props;
      onChange(selectedOption);
    });
  }

  render() {
    const { selectedOption } = this.state;
    const { options, placeholder } = this.props;
    return (
      <ReactSelect
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder={placeholder}
      />
    );
  }
}
