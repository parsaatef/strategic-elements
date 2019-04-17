import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';

class MultiDeleteAction extends Component<Props> {
  remove(multiRemoveItems) {
    const { refetch, resetSelectedItems } = this.props;

    multiRemoveItems()
      .then(async ({ data }) => {
        console.log('-----------data--------', data);

        /**
         * refetch the list
         */
        resetSelectedItems();
        refetch();

        return data;
      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    const { ids, query } = this.props;

    const { multiRemove } = query;

    return (
      <Mutation mutation={multiRemove.gql} variables={{ ids }}>
        {(
          multiRemoveItems // , { loading, error }
        ) => (
          <Button
            onClick={this.remove.bind(this, multiRemoveItems)}
            className="tb-btn-wrap"
            type="submit"
          >
            Apply
          </Button>
        )}
      </Mutation>
    );
  }
}

export default MultiDeleteAction;
