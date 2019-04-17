import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

const { Header, Title, Body, Footer } = Modal;

class ConfirmBox extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };
  }

  componentDidMount() {
    const { status } = this.props;

    if (status === 'open') {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  render() {
    const { show } = this.state;
    const { message, confirmAction } = this.props;

    return (
      <div>
        <Modal
          show={show}
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
            <Button variant="secondary" onClick={this.handleHide}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </Footer>
        </Modal>
      </div>
    );
  }
}

export default ConfirmBox;
