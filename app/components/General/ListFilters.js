import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { Form, Button, Row, Col } from 'react-bootstrap';

const { Control } = Form;

class ListFilters extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      SearchBy: 'text',
      SearchValue: null,
      indexOfFilter: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.SearchHandleChange = this.SearchHandleChange.bind(this);
  }

  handleChange(event) {
    const { SearchBy, SearchValue } = this.state;
    const { applyFilters } = this.props;
    if (SearchBy === 'select') {
      this.setState({ SearchValue: event });
    } else {
      this.setState({ SearchValue: event.target.value });
    }
    applyFilters(SearchBy, SearchValue);
  }

  handleSubmit(event) {
    const { SearchBy, SearchValue } = this.state;
    const { applyFilters } = this.props;
    event.preventDefault();

    applyFilters(SearchBy, SearchValue);
  }

  SearchHandleChange(selectedOption) {
    const { filters } = this.props;
    let indexOfFilterVal = filters.findIndex(
      x => x.filter === selectedOption.value
    );

    if (indexOfFilterVal === -1) {
      indexOfFilterVal = 0;
    }

    this.setState({
      selectedOption,
      indexOfFilter: indexOfFilterVal,
      SearchBy: filters[indexOfFilterVal].type
    });
  }

  render() {
    const { selectedOption, indexOfFilter, SearchBy } = this.state;
    const { filters, autoApply } = this.props;
    let SearchOptions = [{ value: 'SearchBy', label: 'Search By' }];

    for (let i = 0; i < filters.length; i + 1) {
      SearchOptions = SearchOptions.concat([
        {
          value: filters[i].filter,
          label: filters[i].label
        }
      ]);
    }

    let filterType;

    if (SearchBy === 'text') {
      filterType = (
        <Control
          type="text"
          onChange={this.handleChange}
          placeholder={filters[indexOfFilter].label}
        />
      );
    } else {
      filterType = (
        <ReactSelect
          onChange={this.handleChange}
          options={filters[indexOfFilter].options}
        />
      );
    }

    return (
      <div>
        <Row className="tb-filter-wrap">
          <Col sm={3}>
            <ReactSelect
              value={selectedOption}
              onChange={this.SearchHandleChange}
              options={SearchOptions}
            />
          </Col>
          {!autoApply ? (
            <Col sm={4}>
              <Row>
                <Col sm={9}>{filterType}</Col>
                <Col className="tb-btn-wrap" sm={3}>
                  <Button className="tb-btn-wrap" type="submit">
                    Apply
                  </Button>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col sm={3}>{filterType}</Col>
          )}
        </Row>
      </div>
    );
  }
}

export default ListFilters;
