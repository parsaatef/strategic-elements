import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/confirmBox';

const { Header, Title, Body, Footer } = Modal;

type Props = {
  confirm: boolean,
  message: string,
  confirmAction: () => void,
  handleHide: () => void
};

class ConfirmBox extends Component<Props> {
  render() {
    const { message, confirmAction, confirm, handleHide } = this.props;

    return (
      <div className="confirm-box-container">
        <Modal
          show={confirm}
          onHide={this.handleHide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Header closeButton>
            <Title id="contained-modal-title-vcenter">Delete</Title>
          </Header>
          <Body>{message}</Body>
          <Footer>
            <Button variant="secondary" onClick={handleHide}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  confirm: state.confirm.status,
  message: state.confirm.message,
  confirmAction: state.confirm.confirmAction
});

const mapDispatchToProps = dispatch => ({
  handleHide: () => dispatch(hideModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmBox);
