import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Row, Col } from 'react-bootstrap';
import ReactSelect from 'react-select';
import ListFilters from './ListFilters';
import MultiDeleteAction from './multiDelete';
import STPagination from './pagination';
import Table from './table';
import { addStaticVariables } from '../../utils/utility';
import PageHeading from '../General/PageHeading';

const bulkActionsOptions = [
  { value: 'delete', label: 'Delete Selected Items' }
];

class ItemsList extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      refetchStatus: 'default',
      searchBy: '',
      searchValue: '',
      limit: 2,
      firstItem: 0,
      bulkAction: '',
      selectedItems: []
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.setSelectedItems = this.setSelectedItems.bind(this);
    this.setBulkAction = this.setBulkAction.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.resetSelectedItems = this.resetSelectedItems.bind(this);
  }

  componentDidMount() {
    this.setState({
      refetchStatus: 'firstLoad'
    });
  }

  checkAll(ids, e) {
    if (e.target.checked) {
      this.setState({
        selectedItems: ids
      });
    } else {
      this.setState({
        selectedItems: []
      });
    }
  }

  setSelectedItems(selectedItems) {
    this.setState({
      selectedItems
    });
  }

  resetSelectedItems() {
    this.setState({
      selectedItems: []
    });
  }

  setBulkAction({ value }) {
    this.setState({
      bulkAction: value
    });
  }

  onPageChange(page) {
    this.setState(prevState => ({
      firstItem: (page - 1) * prevState.limit
    }));
  }

  applyFilters(searchBy, searchValue) {
    this.setState({
      searchBy,
      searchValue
    });
  }

  render() {
    const {
      refetchStatus,
      firstItem,
      limit,
      bulkAction,
      selectedItems,
      searchBy,
      searchValue
    } = this.state;

    const {
      heading,
      query,
      filters,
      columns,
      editRoute,
      indexCol,
      keyCol,
      titleCol
    } = this.props;

    const { list } = query;

    let variables = {
      offset: limit,
      first: firstItem
    };

    if (searchBy) {
      variables[searchBy] = searchValue;
    }

    variables = addStaticVariables(list, variables);

    return (
      <div>
        <PageHeading className="admin-list-heading" title={heading} />

        <Query query={list.gql} variables={variables}>
          {({ data, loading, error, refetch }) => {
            console.log('----data-----', data, loading, error);
            return (
              <section>
                <Row className="tb-filter-wrap">
                  <Col sm={4}>
                    <Row>
                      <Col sm={8}>
                        <ReactSelect
                          value={bulkAction}
                          onChange={this.setBulkAction}
                          options={bulkActionsOptions}
                          placeholder="Select"
                        />
                      </Col>
                      <Col className="tb-btn-wrap" sm={4}>
                        {bulkAction === 'delete' && (
                          <MultiDeleteAction
                            ids={selectedItems}
                            resetSelectedItems={this.resetSelectedItems}
                            refetch={refetch}
                            query={query}
                          />
                        )}
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={8}>
                    <ListFilters
                      applyFilters={this.applyFilters}
                      autoApply={false}
                      filters={filters}
                    />
                  </Col>
                </Row>

                <Table
                  data={data}
                  loading={loading}
                  error={error}
                  refetch={refetch}
                  refetchStatus={refetchStatus}
                  selectedItems={selectedItems}
                  setSelectedItems={this.setSelectedItems}
                  resetSelectedItems={this.resetSelectedItems}
                  columns={columns}
                  indexCol={indexCol}
                  keyCol={keyCol}
                  query={query}
                  checkAll={this.checkAll}
                  editRoute={editRoute}
                  titleCol={titleCol}
                />

                <STPagination
                  total={
                    data && data[list.func] && data[list.func].totalCount
                      ? data[list.func].totalCount
                      : 0
                  }
                  onPageClick={this.onPageChange}
                  perPage={limit}
                />
              </section>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ItemsList;
