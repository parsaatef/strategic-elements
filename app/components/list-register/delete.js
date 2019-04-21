import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { addStaticVariables } from '../../utils/utility';
import {
  showModal,
  setMessage,
  applyConfirm,
  hideModal
} from '../../actions/confirmBox';

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

  removeActionConfirm(removeItem) {
    const { dispatch, handleShow, handleHide } = this.props;

    dispatch(setMessage('test.....'));

    handleShow();

    dispatch(
      applyConfirm(() => {
        handleHide();

        this.remove(removeItem);
      })
    );
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
            onClick={this.removeActionConfirm.bind(this, removeItem)}
          >
            <OverlayTrigger
              overlay={<Tooltip id="tb-delete-tooltip">Delete</Tooltip>}
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

const mapDispatchToProps = dispatch => ({
  handleShow: () => dispatch(showModal()),
  handleHide: () => dispatch(hideModal()),
  dispatch
});

export default connect(
  null,
  mapDispatchToProps
)(DeleteAction);
