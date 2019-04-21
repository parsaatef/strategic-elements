import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { addStaticVariables } from '../../utils/utility';

class DeleteAction extends Component<Props> {
  remove(removeItem) {
    const { refetch, resetSelectedItems } = this.props;

    removeItem()
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
    const { id, query } = this.props;

    let variables = { id };

    variables = addStaticVariables(query.remove, variables);

    return (
      <Mutation mutation={query.remove.gql} variables={variables}>
        {(
          removeItem // , { loading, error }
        ) => (
          <div
            role="toolbar"
            onKeyUp={e => console.log(e)}
            className="tb-icons tb-delete-icon"
            onClick={this.remove.bind(this, removeItem)}
          >
            <OverlayTrigger
              overlay={
                <Tooltip id="tb-delete-tooltip">
                  <FormattedMessage id="global.delete" />
                </Tooltip>
              }
            >
              <span className="tb-tooltip-btn">
                <span className="fal fa-trash" />
              </span>
            </OverlayTrigger>
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeleteAction;
