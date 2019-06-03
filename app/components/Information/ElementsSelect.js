import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { Query } from 'react-apollo';
import _ from 'underscore';
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
    const { group, elementSelectRefresh, elementDefault } = this.props;

    const self = this;

    if (prevProps.group !== group && group) {
      self.setState({
        selectedOption: null
      });
    }

    if (prevProps.elementSelectRefresh !== elementSelectRefresh) {
      self.handleChange(_.clone(elementDefault));
    }
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption }, () => {
      const { onChangeElement } = this.props;
      onChangeElement(selectedOption);
    });
  }

  /**
   * groupType can be category or group of elements
   * default is category
   * @returns {*}
   */
  render() {
    const { group, groupType = 'category' } = this.props;

    return (
      <Query
        query={GET_ELEMENTS}
        variables={{
          [groupType]: group,
          offset: -1
        }}
        onCompleted={data => {
          if (data && data.searchElement && data.searchElement.elements) {
            const { setGroupElements } = this.props;

            const { selectedOption } = this.state;

            setGroupElements(data.searchElement.elements, selectedOption);
          }
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
          }

          const { selectedOption } = this.state;

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
