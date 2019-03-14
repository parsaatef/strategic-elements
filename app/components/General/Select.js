import React, { Component } from 'react';
import ReactSelect from 'react-select';

export default class Select extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
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
