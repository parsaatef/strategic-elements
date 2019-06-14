import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Row, Col } from 'react-bootstrap';
import ReactSelect from 'react-select';
import ListFilters from './ListFilters';
import MultiDeleteAction from './multiDelete';
import STPagination from './pagination';
import Table from './table';
import { addStaticVariables, FormattedSimpleMsg } from '../../utils/utility';
import PageHeadingIcon from '../General/PageHeadingIcon';

const bulkActionsOptions = [
  {
    value: 'delete',
    label: <FormattedSimpleMsg id="global.deleteSelectedItems" />
  }
];

class ItemsList extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      refetchStatus: 'default',
      searchBy: '',
      searchValue: '',
      limit: 10,
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
      icon,
      query,
      filters,
      columns,
      editRoute,
      indexCol,
      keyCol,
      titleCol,
      itemsDetail,
      itemsDetailLabels
    } = this.props;

    const { list } = query;

    let variables = {
      offset: limit,
      first: firstItem
    };

    if (searchBy && searchValue) {
      variables[searchBy] =
        searchBy === 'elements' ? [searchValue] : searchValue;
    }

    variables = addStaticVariables(list, variables);

    return (
      <div>
        <PageHeadingIcon
          className="without-border admin-list-heading"
          icon={icon}
          title={heading}
        />

        <Query query={list.gql} variables={variables}>
          {({ data, loading, error, refetch }) => {
            console.log('----data-----', data, loading, error);
            return (
              <section>
                <Row className="tb-filter-wrap animated  fadeInUp fast delay-1-5s animation-fill-mode-backwards">
                  <Col md={5}>
                    <div className="smfp-filter-item">
                      <ReactSelect
                        value={bulkAction}
                        onChange={this.setBulkAction}
                        options={bulkActionsOptions}
                        placeholder=<FormattedSimpleMsg id="global.select" />
                      />
                    </div>
                    {bulkAction === 'delete' && (
                      <div className="tb-btn-wrap smfp-filter-item">
                        <MultiDeleteAction
                          ids={selectedItems}
                          resetSelectedItems={this.resetSelectedItems}
                          refetch={refetch}
                          query={query}
                        />
                      </div>
                    )}
                  </Col>

                  <Col md={7}>
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
                  itemsDetail={itemsDetail}
                  itemsDetailLabels={itemsDetailLabels}
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
