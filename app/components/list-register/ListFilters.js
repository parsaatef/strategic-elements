import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { Form, Button, Row, Col } from 'react-bootstrap';
import _ from 'underscore';

const { Control } = Form;

const getSelectValue = (value, options) => _.findWhere(options, { value });

class ListFilters extends Component<Props> {
  constructor(props) {
    super(props);

    const { filters } = this.props;

    let defaultSearchBy = {};

    let currentFilter = '';

    let defaultValue = '';

    this.searchOptions = [];

    for (let i = 0; i < filters.length; i += 1) {
      const option = {
        value: filters[i].filter,
        label: filters[i].label
      };

      this.searchOptions.push(option);

      if (filters[i] && filters[i].isDefault) {
        defaultSearchBy = filters[i].filter;
        currentFilter = filters[i];
        defaultValue = filters[i].default;
      }
    }

    this.defaultSearchBy = defaultSearchBy;
    this.defaultSearchValue = defaultValue;
    this.defaultFilter = _.clone(currentFilter);

    this.state = {
      searchBy: defaultSearchBy,
      searchValue: defaultValue,
      currentFilter: _.clone(currentFilter)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchByChange = this.searchByChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  handleChange(e) {
    const { searchBy, currentFilter } = this.state;

    const { applyFilters, autoApply } = this.props;

    const value = currentFilter.type === 'select' ? e.value : e.target.value;

    this.setState(
      {
        searchValue: value
      },
      () => {
        if (autoApply) {
          applyFilters(searchBy, value);
        }
      }
    );
  }

  handleSubmit(event) {
    const { searchBy, searchValue } = this.state;
    const { applyFilters } = this.props;
    event.preventDefault();

    applyFilters(searchBy, searchValue);
  }

  searchByChange(selectedOption) {
    const { filters } = this.props;

    this.setState({
      currentFilter: _.findWhere(filters, { filter: selectedOption.value }),
      searchBy: selectedOption.value,
      searchValue: ''
    });
  }

  resetFilters() {
    const { applyFilters } = this.props;

    this.setState(
      {
        currentFilter: this.defaultFilter,
        searchBy: this.defaultSearchBy,
        searchValue: this.defaultSearchValue
      },
      () => {
        applyFilters(this.defaultSearchBy, this.defaultSearchValue);
      }
    );
  }

  render() {
    const { currentFilter, searchBy, searchValue } = this.state;
    const { autoApply } = this.props;

    let filterType;

    if (currentFilter.type === 'text') {
      filterType = (
        <Control
          value={searchValue}
          type="text"
          onChange={this.handleChange}
          placeholder={currentFilter.label}
        />
      );
    } else {
      filterType = (
        <ReactSelect
          value={getSelectValue(searchValue, currentFilter.options)}
          onChange={this.handleChange}
          options={currentFilter.options}
        />
      );
    }

    return (
      <div>
        <Row>
          <Col sm={!autoApply ? 4 : 5}>
            <ReactSelect
              value={getSelectValue(searchBy, this.searchOptions)}
              onChange={this.searchByChange}
              options={this.searchOptions}
            />
          </Col>
          {!autoApply ? (
            <>
              <Col sm={5}>{filterType}</Col>
              <Col className="tb-btn-wrap" sm={3}>
                <Button
                  onClick={this.handleSubmit}
                  className="tb-btn-wrap"
                  type="button"
                >
                  Apply
                </Button>
              </Col>
            </>
          ) : (
            <Col sm={7}>{filterType}</Col>
          )}
          <Button
            onClick={this.resetFilters}
            className="tb-btn-wrap"
            type="button"
          >
            Reset
          </Button>
        </Row>
      </div>
    );
  }
}

export default ListFilters;
