import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'underscore';
import ListActions from './ListActions';
import { getUnit } from '../../utils/utility';
import DetailAction from './detail';

const { Control, Label } = Form;

class Table extends Component<Props> {
  constructor(props) {
    super(props);

    this.checkItem = this.checkItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { refetchStatus, refetch } = this.props;

    /**
     * if has changed refetchStatus we will need to refetch data from server
     */
    if (prevProps.refetchStatus !== refetchStatus) {
      refetch();
    }
  }

  checkItem(e) {
    const { selectedItems, setSelectedItems } = this.props;

    const { value } = e.target;

    const newSelectedItems = [...selectedItems];

    if (e.target.checked) {
      if (!newSelectedItems.includes(value)) {
        newSelectedItems.push(value);
      }
    } else {
      const index = newSelectedItems.indexOf(value);

      if (index > -1) {
        newSelectedItems.splice(index, 1);
      }
    }

    setSelectedItems(newSelectedItems);
  }

  render() {
    const {
      data,
      refetch,
      resetSelectedItems,
      selectedItems,
      columns,
      indexCol = 'id',
      keyCol,
      titleCol,
      query,
      checkAll,
      editRoute,
      itemsDetail,
      itemsDetailLabels
    } = this.props;

    const { list } = query;

    const allIds =
      data && data[list.func] && data[list.func][list.items]
        ? _.pluck(data[list.func][list.items], indexCol)
        : [];

    return (
      <table className="table table-striped table-bordered animated fadeInUp fast delay-2s">
        <thead>
          <tr>
            {columns.map(col => {
              if (col && col.isCheck) {
                return (
                  <th key={col.key} className="check-column">
                    <Label className="checkbox-wrap">
                      <Control
                        onChange={checkAll.bind(null, allIds)}
                        type="checkbox"
                        checked={allIds.length === selectedItems.length}
                      />
                      <span className="checkmark" />
                    </Label>
                  </th>
                );
              }

              return (
                <th key={col.key}>
                  <span>{col.title}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data[list.func] &&
            data[list.func][list.items] &&
            data[list.func][list.items].map(dbCol => (
              <tr
                className="animated fadeInUp fast animation-auto-delay"
                key={dbCol[keyCol]}
              >
                {columns.map(col => {
                  if (col && col.isCheck) {
                    return (
                      <td key={col.key} className="check-column">
                        <Label className="checkbox-wrap">
                          <Control
                            value={dbCol[indexCol]}
                            onChange={this.checkItem}
                            type="checkbox"
                            checked={selectedItems.includes(dbCol[indexCol])}
                          />
                          <span className="checkmark" />
                        </Label>
                      </td>
                    );
                  }

                  if (col && col.key === 'action') {
                    return (
                      <td className="list-actions" key={col.key}>
                        <ListActions
                          id={dbCol[indexCol]}
                          refetch={refetch}
                          resetSelectedItems={resetSelectedItems}
                          query={query}
                          editRoute={editRoute}
                          indexCol={indexCol}
                          keyCol={keyCol}
                          titleCol={titleCol}
                          itemsDetail={itemsDetail}
                          itemsDetailLabels={itemsDetailLabels}
                        />
                      </td>
                    );
                  }

                  if (col && col.key === 'unit' && col.isUnit) {
                    return (
                      <td key={col.key}>
                        <span>{getUnit('option', dbCol.unit)}</span>
                      </td>
                    );
                  }

                  if (col && col.key === titleCol) {
                    return (
                      <td key={col.key}>
                        {col && col.item && _.isFunction(col.item) ? (
                          <span> col.item(dbCol)</span>
                        ) : (
                          <DetailAction
                            id={dbCol[indexCol]}
                            query={query}
                            indexCol={indexCol}
                            keyCol={keyCol}
                            titleCol={titleCol}
                            type="text"
                            itemsDetail={itemsDetail}
                            itemsDetailLabels={itemsDetailLabels}
                          />
                        )}
                      </td>
                    );
                  }

                  return (
                    <td key={col.key}>
                      <span>
                        {col && col.item && _.isFunction(col.item)
                          ? col.item(dbCol)
                          : dbCol[col.key]}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
