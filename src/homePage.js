import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';

class StudentSignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <p>Click to get the full Modal experience!</p>

        <Button bsStyle="success" bsSize="large" onClick={this.open}>
          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            TODO modal body
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

StudentSignUpForm.propTypes = {
  name: PropTypes.string
};

StudentSignUpForm.defaultProps = {
  name: 'Stranger'
};

ReactDOM.render(<StudentSignUpForm name='Student'/>,
  document.getElementById('root'));