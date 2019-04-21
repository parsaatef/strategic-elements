import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { addStaticVariables } from '../../utils/utility';

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

    let variables = { ids };

    variables = addStaticVariables(multiRemove, variables);

    return (
      <Mutation mutation={multiRemove.gql} variables={variables}>
        {(
          multiRemoveItems // , { loading, error }
        ) => (
          <Button
            onClick={this.remove.bind(this, multiRemoveItems)}
            className="tb-btn-wrap"
            type="submit"
          >
            <FormattedMessage id="global.apply" />
          </Button>
        )}
      </Mutation>
    );
  }
}

export default MultiDeleteAction;
