import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { Query } from 'react-apollo';
import { FormattedSimpleMsg } from '../../utils/utility';
import { GET_ELEMENTS } from '../../queries/element';

class ElementsSelect extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    /* const { group } = this.props;

    const { selectedOption } = this.state;

    if( !group && ( !selectedOption || !selectedOption.value ) ){

    } */
  }

  componentDidUpdate(prevProps) {
    const { group } = this.props;

    const self = this;

    if (prevProps.group !== group) {
      self.setState({
        selectedOption: null
      });
    }
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption }, () => {
      const { onChangeElement } = this.props;
      onChangeElement(selectedOption);
    });
  }

  render() {
    const { group } = this.props;

    const { selectedOption } = this.state;

    return (
      <Query
        query={GET_ELEMENTS}
        variables={{
          group,
          offset: -1
        }}
      >
        {({ data, loading, error }) => {
          console.log('----data-----', data, loading, error);
          if (loading) return 'loading.....';

          const options = [
            /* {
              label: <FormattedSimpleMsg id='global.select_element' /> ,
              value: ""
            } */
          ];

          if (data && data.searchElement && data.searchElement.elements) {
            data.searchElement.elements.forEach(elem => {
              options.push({
                label: elem.elementTitle,
                value: elem.element
              });
            });

            const { setGroupElements } = this.props;

            setGroupElements(
              data.searchElement.elements.map(elem => elem.element),
              selectedOption
            );
          }

          return (
            <ReactSelect
              onChange={this.handleChange}
              value={selectedOption}
              options={options}
              placeholder={<FormattedSimpleMsg id="global.select_element" />}
            />
          );
        }}
      </Query>
    );
  }
}

export default ElementsSelect;
