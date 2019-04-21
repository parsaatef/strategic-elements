import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addStaticVariables } from '../../utils/utility';
import {
  applyConfirm,
  hideModal,
  setMessage,
  showModal
} from '../../actions/confirmBox';

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

  removeActionConfirm(multiRemoveItems) {
    const { dispatch, handleShow, handleHide } = this.props;

    dispatch(setMessage('test.....'));

    handleShow();

    dispatch(
      applyConfirm(() => {
        handleHide();

        this.remove(multiRemoveItems);
      })
    );
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
            onClick={this.removeActionConfirm.bind(this, multiRemoveItems)}
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

const mapDispatchToProps = dispatch => ({
  handleShow: () => dispatch(showModal()),
  handleHide: () => dispatch(hideModal()),
  dispatch
});

export default connect(
  null,
  mapDispatchToProps
)(MultiDeleteAction);
