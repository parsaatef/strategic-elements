import React from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormattedSimpleMsg } from '../../utils/utility';

const { Header, Title, Body } = Modal;

const { Control, Group, Label } = Form;

type Props = {
  name: string,
  value: string,
  label: string,
  error: array | string,
  handleChange: () => void
};

class TextEditor extends React.Component<Props> {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;

    const { name, value, handleChange, label, error } = this.props;

    return (
      <Group
        className="animated fadeInUpBig fast animation-auto-delay"
        as={Row}
        controlId={`field_${name}`}
      >
        <Label column sm={3}>
          {label}
        </Label>
        <Col sm={9}>
          <Button variant="primary" onClick={this.handleShow}>
            <FormattedSimpleMsg id="global.open_editor" />
          </Button>

          <Control.Feedback type="invalid">{error}</Control.Feedback>

          <Modal show={show} onHide={this.handleClose} size="lg">
            <Header closeButton>
              <Title>{label}</Title>
            </Header>
            <Body>
              <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                  handleChange(name, data);
                }}
              />
            </Body>
            {/* <Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
              </Button>
            </Footer> */}
          </Modal>
        </Col>
      </Group>
    );
  }
}

export default TextEditor;
