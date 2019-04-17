import React, { Component } from 'react';
import DeleteAction from './delete';
import EditAction from './edit';
import DetailAction from './detail';

class ListActions extends Component<Props> {
  render() {
    const {
      id,
      refetch,
      resetSelectedItems,
      query,
      editRoute,
      indexCol,
      keyCol,
      titleCol
    } = this.props;

    return (
      <section>
        <EditAction id={id} editRoute={editRoute} />

        <DetailAction
          id={id}
          query={query}
          indexCol={indexCol}
          keyCol={keyCol}
          titleCol={titleCol}
        />

        <DeleteAction
          id={id}
          refetch={refetch}
          resetSelectedItems={resetSelectedItems}
          query={query}
        />
      </section>
    );
  }
}

export default ListActions;
